import axios from "axios";
const API_KEY = "YOUR_API_KEY_GOES_HERE";

const MovieService = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: 'application/json',
    }
})

export default MovieService