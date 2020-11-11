import { useRef } from 'react'

export default (value) => {
    const latestRef = useRef();
    latestRef.current = value;
    return latestRef.current;
}