import { act as hookAct, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import useMemoRef from './index'
import React, { useCallback, useEffect, useState } from 'react';

let mockDeps = { max: 10 };
const mockFn = jest.fn(p => p);

const TestApp = ({ count }) => {
    const [memo, memoRef] = useMemoRef(() => count, [count])
    return <div>
        <span>memo:{memo}</span>
        <span>memoRef:{memoRef.current}</span>
    </div>
}

const useTestHook = () => {
    const [count, setCount] = useState(0)
    const [call, setCall] = useState(new Date())

    const [memo, memoRef] = useMemoRef(() => count, [count])
    useEffect(() => {
        console.log(memoRef.current)
        const p={...memoRef}
        mockFn(p.current)
    }, [call])

    return {
        memo,
        memoRef,
        count,
        setCount,
        setCall,
    }
}


describe('useMemoRef', () => {
    it('should be defined', () => {
        expect(useMemoRef).toBeDefined();
    });

    it('memoRef is alway updating after memo is updated', () => {
        const { rerender, container, getByText } = render(<TestApp count={1} />);

        expect(getByText('memo:1')).toBeInTheDocument()
        expect(getByText('memoRef:1')).toBeInTheDocument()

        rerender(<TestApp count={2} />)

        expect(getByText('memo:2')).toBeInTheDocument()
        expect(getByText('memoRef:1')).toBeInTheDocument()

        rerender(<TestApp count={3} />)
        expect(getByText('memo:3')).toBeInTheDocument()
        expect(getByText('memoRef:2')).toBeInTheDocument()
    });

    it('memo and memoRef is always update with its deps like useMemo', () => {
        const { rerender, result } = renderHook(() => useTestHook())
        hookAct(() => {
            result.current.setCount(1)
        })
        expect(result.current.memo).toBe(1)
        expect(result.current.count).toBe(1)
        expect(result.current.memoRef.current).toBe(1)

        hookAct(() => {
            result.current.setCount(2)
        })
        expect(result.current.memo).toBe(2)
        expect(result.current.count).toBe(2)
        expect(result.current.memoRef.current).toBe(2)

        hookAct(() => {
            result.current.setCall(new Date())
        })
        expect(result.current.memo).toBe(2)
        expect(result.current.count).toBe(2)
        expect(result.current.memoRef.current).toBe(2)
    })

    it('memoRef`s change won`t cause useEffect', () => {
        const { rerender, result } = renderHook(() => useTestHook())
        expect(mockFn).toHaveBeenCalledTimes(1);

        hookAct(() => {
            result.current.setCount(1)
        })
        expect(mockFn).toHaveBeenCalledTimes(1);
        
        hookAct(() => {
            result.current.setCall(new Date())
        })
        expect(mockFn).toHaveBeenCalledTimes(2);
        expect(mockFn).toHaveReturnedWith(1);


        hookAct(() => {
            result.current.setCount(2)
        })
        expect(mockFn).toHaveBeenCalledTimes(2);

        hookAct(() => {
            result.current.setCall(new Date())
        })
        expect(mockFn).toHaveBeenCalledTimes(3);
        expect(mockFn).toHaveReturnedWith(2);

        hookAct(() => {
            result.current.setCall(new Date())
        })
        expect(mockFn).toHaveBeenCalledTimes(4);
    })
})