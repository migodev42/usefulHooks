import { useRef } from "react"

const useRenderCount = () => {
    const renders = useRef(0)
    return [renders.current++]
}

export default useRenderCount