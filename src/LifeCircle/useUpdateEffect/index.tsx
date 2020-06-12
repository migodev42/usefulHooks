import { useEffect } from "react";
import { useFirstMountState } from "../..";

const useUpdateEffect: typeof useEffect = (effect, deps) => {
    const isFirstMount = useFirstMountState();

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (!isFirstMount) {
            return effect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

export default useUpdateEffect