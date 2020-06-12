import { useRef, useEffect } from "react";

const useFirstMountState = () => {
    const isFirstMount = useRef(true);

    useEffect(() => {
        isFirstMount.current = false;
    }, []);

    return isFirstMount.current;
};

export default useFirstMountState