import React, { useState, useEffect, useMemo,memo,useCallback } from 'react'


/**
 * useMemo有返回值可以直接参与渲染
 */
function UseMemoAPI() {
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  const double = useMemo(() => {
    return count * 2
    // 此时运行2次,count等于3一次 count等于4一次,从false>true true>false
  },[count == 3])

  // 假设什么都不依赖
  const click = useCallback(() => {
    console.log('click------------')
  },[])

  const click2 = useCallback(() => {
    setClickCount((clickCount)=> clickCount +1 )
  },[])

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click ({count})</button>
      double: {double}
      <Counter count={double} click={click} />
    </div>
  )
}

/**
 * memo
 * 只要父组件的值不变化,子组件就没必要渲染,
 * 如果父组件传递函数情况下,可以考虑useMemo和useCallback来作为优化手段
 */

const Counter = memo(function (props) {
  console.log(1111)
  return (
    <h1 onClick={props.click}>{props.count}</h1>
  )
})

export default UseMemoAPI
