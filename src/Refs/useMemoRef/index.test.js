import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useMemoRef from './index'

describe('useMemoRef', () => {
    it('should be defined', () => {
        expect(useMemoRef).toBeDefined();
    });

    it('try use', () => {
        const [state, setState] = useState(0)
        const { rerender } = renderHook(() => {
            const [memoState, memoStateRef]=useMemoRef(() => state, state)
        });
    });

})