import React, { Component, useState, useEffect } from 'react'

// 类写法
class App2 extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
  // 监听resize事件
  componentDidMount() {
    document.title = this.state.count
    window.addEventListener('resize', this.onResize, false)
  }
  componentDidUpdate() {
    document.title = this.state.count
  }
  // 卸载事件
  componentWillMount() {
    window.removeEventListener('resize', this.onResize, false)
  }
  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientWidth,
      }
    })
  }
  render() {
    const { count, size } = this.state
    return (
      <div>
        <button onClick={() => { this.setState({ count: count + 1 }) }}>Click ({count})</button>
        宽{size.width}* 高{size.height}
      </div>
    )
  }
}

/** 副作用时机 
 * DidMount之后
 * DidUpdate之后
 * WillUnmount之前
 * 绑定事件,网络请求,访问dom
 * 渲染之后运行
*/

// hooks写法
function UseEffectAPI(props) {
  const [count, setCount] = useState(0)
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientWidth,
  })
  // 相当于DidMount和DidUpdate
  useEffect(() => {
    document.title = count
  })
   // 相当于DidMount和DidUpdate
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    // 清除事件
    return () => {
      window.removeEventListener('resize',onResize,false)
    }
    // 第二个参数是一个数组,只有每一项都不变情况,就不会执行,所以现在只执行一次
  },[])

  const onResize = () => {
    setSize(
      {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientWidth,
      }
    )
  }
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click ({count})</button>
      宽{size.width}* 高{size.height}
    </div>
  )
}


export default UseEffectAPI  