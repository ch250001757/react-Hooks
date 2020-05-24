import React, { Component, useState, useRef, useEffect } from 'react'

// 类写法
class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
    }
  }
  render() {
    const { count } = this.state
    return (
      <button onClick={() => { this.setState({ count: count + 1 }) }}>Click ({count})</button>
    )
  }
}

// hooks写法
function UseStateAPI(props) {
  const [count, setCount] = useState(0)
  // const [sum,setSum] = useState(() =>{
  //   // 回调延迟初始化sum的值,只会运行一次
  //   return props.defaultSum || 0
  // })

  return (
    <button onClick={() => { setCount(count + 1) }}>Click ({count})</button>
  )
}

// ref存储上一次变量
function Counter() {
  const [count, setCount] = useState(0)

  const prevCountRef = useRef()

  useEffect(() => {
    console.log(111)
    prevCountRef.current = count
  })

  const prevCount = prevCountRef.current
  // console.log(prevCount)
  return <h1>Now:{count},before:{prevCount} <button onClick={() => setCount(count+1)}>点我</button></h1>
}





export default Counter  