import { NavigateFunction, useNavigate } from "react-router-dom";
import Movie from "../../models/movie";
import { AnimationControls, motion } from "framer-motion";

const CardMovie = (props: { movie: Movie; animationControl: AnimationControls }) => {
    const movie: Movie = props.movie;
    const animationControl = props.animationControl;
    const navigate: NavigateFunction = useNavigate();

    function onItemClick() {
        navigate(`/details/${movie.id}`);
    }

    return (
        <motion.div key={movie.id} className='flex flex-col items-center w-auto h-96 cursor-pointer hover:scale-105 transition-all movieCard' onClick={onItemClick}
        animate={animationControl}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='w-52 rounded-lg'/>
            <p className="w-52 text-center">{movie.title}</p>
        </motion.div>
    )
}

export default CardMovie;