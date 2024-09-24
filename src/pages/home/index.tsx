import { useEffect, useState } from 'react';
import MovieService from '../../services/MovieService.tsx'
import Movie from '../../models/movie.tsx'
import Carousel from '../../components/carousel/carousel.tsx';
import Genre from '../../models/genre.tsx';
import './styles.css'

function Home() {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [genres, setGenres] = useState<Array<Genre>>([]);

  async function getMovieList() {
    MovieService.get('discover/movie?include_adult=false&include_video=false&language=pt-BR&sort_by=popularity.desc')
    .then((response) => {
      setMovies(response.data.results);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  async function getGenreList() {
    MovieService.get('genre/movie/list?language=pt')
    .then((response) => {
      setGenres(response.data.genres);
    })
    .catch((error) => {
      console.error(error);
    });
  }
 
  useEffect(() => {
    getMovieList();
    getGenreList();
  }, [])

  return (
    <div className='mt-10 mx-10'>
      {genres.map((genre, index) => (
        <div key={index}>
          {movies.filter(x => x.genre_ids.includes(genre.id)).length > 0
          && <Carousel category={genre.name} movies={movies.filter(x => x.genre_ids.includes(genre.id))}></Carousel>
          }
        </div>
      ))}
    </div>
  )
}

export default Home
