import { useEffect, useState } from "react";
import Movie from "../../models/movie";
import CardMovie from "../card/cardMovie";
import useScreenSize from "../../helpers/useScreenSize";
import { ScreenSize } from "../../models/screenSize";
import { SizeType } from "../../models/sizeType";
import { AnimationControls, useAnimationControls } from "framer-motion";

const Carousel = (props: { category: string, movies: Array<Movie>}) => {
    const category = props.category;
    const movies = props.movies;
    
    const screenSize: ScreenSize = useScreenSize();
    const controls: AnimationControls = useAnimationControls()

    const limitMinIndex = 0;
    let limitMaxIndex = 3;
  
    const [minIndex, setMinIndex] = useState<number>(limitMinIndex);
    const [maxIndex, setMaxIndex] = useState<number>(limitMaxIndex);

    function previousCarouselImage() {
        const previousMinIndex = minIndex - 1 < limitMinIndex ? limitMinIndex : minIndex - 1;
        const previousMaxIndex = maxIndex - 1 < limitMaxIndex ? limitMaxIndex : maxIndex - 1;
    
        setMinIndex(previousMinIndex);
        setMaxIndex(previousMaxIndex);
    };
    
    function nextCarouselImage() {
        const nextMinIndex = minIndex + 1 > movies.length - 4 ? movies.length - 4 : minIndex + 1;
        const nextMaxIndex = maxIndex + 1 > movies.length - 1 ? movies.length - 1 : maxIndex + 1;
        
        setMinIndex(nextMinIndex);
        setMaxIndex(nextMaxIndex);
    };

    function controlCarouselSize(screenSize: ScreenSize) {
        const width = screenSize.width;

        if (width >= SizeType['xl'])
        {
            limitMaxIndex = 3;
            setMaxIndex(minIndex + 3);
        }
        else if (width >= SizeType['lg'])
        {
            limitMaxIndex = 2;
            setMaxIndex(minIndex + 2);
        }
        else if (width >= SizeType['md'])
        {
            limitMaxIndex = 1;
            setMaxIndex(minIndex + 1);
        }
        else
        {
            limitMaxIndex = 0;
            setMaxIndex(minIndex + 0);
        }
    }

    useEffect(() => {
        controlCarouselSize(screenSize);
    })

    return (
        <>
            <div className="flex flex-col gap-y-2">
                <div className="font-bold text-4xl ml-5">{category}</div>

                <div className='flex justify-between items-center'>
                <button type="button" className="flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={previousCarouselImage}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-slate-50 group-hover:bg-white/50 dark:group-hover:bg-gray-400/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-300/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    </span>
                </button>
                
                {movies?.map((movie: Movie, index: number) => (
                    (index >= minIndex && index <= maxIndex) &&
                    <CardMovie movie={movie} animationControl={controls} key={index}/>
                ))}

                <button type="button" className="flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={nextCarouselImage}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-slate-50 group-hover:bg-white/50 dark:group-hover:bg-gray-400/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-300/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                </span>
                </button>
                
                </div>
            </div>
        </>
    )
}

export default Carousel;