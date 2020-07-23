import { useRef, useEffect, useMemo } from 'react'

const useMemoRef = (effect: any, deps: Array<any>) => {
    const memo = useMemo(effect, deps)
    const memoRef = useRef(memo)

    useEffect(() => {
        memoRef.current = memo
    }, deps)

    return [memo, memoRef]
}

export default useStateRef