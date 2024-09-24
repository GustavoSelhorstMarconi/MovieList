import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import MovieService from "../../services/MovieService";
import MovieDetails from "../../models/movieDetails.tsx";
import { Badge } from "../../components/badge/badge.tsx";
import Genre from "../../models/genre";
import GenreColor from "../../models/genreColor.tsx";

export function Details () {
    const { id } = useParams();
    const [movieDetail, setMovieDetail] = useState<MovieDetails>();
    const navigate: NavigateFunction = useNavigate();

    function redirectHome() {
        navigate("/home");
    }

    async function getDetails () {
        MovieService.get(`movie/${id}?language=pt-BR`)
        .then((response) => {
            if (response && response.data)
            {
                const data = response.data as MovieDetails;

                setMovieDetail({
                    id: data.id,
                    title: data.title,
                    overview: data.overview,
                    backdrop_path: data.backdrop_path,
                    poster_path: data.poster_path,
                    vote_average: data.vote_average,
                    release_date: data.release_date,
                    genres: data.genres
                });
            }
            else
            {
                navigate('/home');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div className="flex">
            <button type="button" className="flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none mt-2" onClick={redirectHome}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg dark:bg-slate-50 group-hover:bg-white/50 dark:group-hover:bg-gray-400/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-300/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
                </span>
            </button>

            <div className="flex md:flex-row sm:flex-col sm:mt-2 items-center justify-around w-screen h-screen">
                <div className="flex flex-col gap-y-3 w-1/2">
                    <img src={`https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path}`} className="rounded-lg hover:scale-105 transition-all"/>

                    <p className="font-bold text-6xl">
                        {movieDetail?.title}
                    </p>
                    <div className="flex flex-row gap-x-2">
                        <p className="text-amber-500">
                            Imdb:
                        </p>
                        <p>
                            {movieDetail?.vote_average}
                        </p>
                    </div>
                    <p>
                        Data de lançamento: {new Date(movieDetail?.release_date as string).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="font-bold">Gêneros:</p>
                    <div className="flex gap-x-2">
                        {movieDetail?.genres.map((genre: Genre, index: number) => (
                            <Badge name={genre.name} key={index} color={GenreColor[genre.name as keyof typeof GenreColor]}></Badge>
                        ))}
                    </div>
                    <p>
                        {movieDetail?.overview}
                    </p>
                </div>
            
                <img src={`https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`} className="rounded-lg xl:hover:scale-105 lg:hover:scale-95 md:hover:scale-80 sm:hover:scale-80 transition-all xl:scale-100 lg:scale-90 md:scale-75 sm:scale-75"/>
            </div>
        </div>
    )
}