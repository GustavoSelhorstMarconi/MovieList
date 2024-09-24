import { useEffect, useState } from "react"
import { ScreenSize } from "../models/screenSize"

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState<ScreenSize>({
            width: window.innerWidth,
            height: window.innerHeight
        });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return screenSize;
}

export default useScreenSize;