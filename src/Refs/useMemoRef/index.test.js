import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useState } from 'react'
import useMemoRef from './index'

describe('useMemoRef', () => {
    it('should be defined', () => {
        expect(useMemoRef).toBeDefined();
    });

    it('try use', () => {
        const { rerender } = renderHook(() => {
            const [state, setState] = useState(0)
            const [memoState, memoStateRef] = useMemoRef(() => state, [state])
        });
    });

})