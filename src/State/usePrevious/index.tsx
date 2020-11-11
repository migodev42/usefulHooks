import { useEffect, useRef } from 'react'

export default (value) => {
    const previousRef = useRef();
    useEffect(()=>{
        previousRef.current = value;
    })    
    return previousRef.current;
}