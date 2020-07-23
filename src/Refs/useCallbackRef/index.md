### 简介

结合 `useCallback` 和 `useRef` , 返回 `useCallback` 后的函数和指向最新函数状态的 `ref`

### 使用场景

当使用 `useCallback` 时，依赖了一系列 `deps` , 并需要在 `useEffect` 中用到 `useCallback` 的最新版本，且不想让 `useCallback` 的更新触发 `useEffect`
目标：

* 只在 `params` 改变时候触发 `useEffect`
实际情况：

* `deps` 的改变也会触发 `useEffect`

``` js
const func = useCallback((params) => {
    console.log(deps)
}, [params, deps])

useEffect(() => {
    func(params)
}, [func, params])
```

解决:

``` js
const [func, funcRef] = useCallbackRef((params) => {
    console.log(deps)
}, [params, deps])

/* useEffect(() => {
    func(params)
}, [func, params]) */

useEffect(() => {
    funcRef.current && funcRef.current(params)
}, [params])
```
