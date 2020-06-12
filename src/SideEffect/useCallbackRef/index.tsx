import { useCallback, useRef, useEffect } from 'react'

const useCallbackRef = (propfunc: Function | any, deps: Array<any>) => {
    const func = useCallback(propfunc, deps)
    const funcRef = useRef(func)
    
    useEffect(() => {
        funcRef.current = func
    }, [func])

    return [func, funcRef]
}

export default useCallbackRef