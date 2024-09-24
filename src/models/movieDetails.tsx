import Genre from "./genre";

interface MovieDetails {
    id: string,
    title: string,
    overview: string,
    backdrop_path: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
    genres: Array<Genre>
}

export default MovieDetails;