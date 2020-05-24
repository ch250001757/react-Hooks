import React, { useState, useEffect, useRef, useMemo, memo, useCallback } from 'react'
import './todo.css'

var timer = new Date()

function Control(props) {
  const { addTodo } = props
  const inputVal = useRef()

  const onSubmit = (e) => {
    e.preventDefault()
    let val = inputVal.current.value.trim()
    if (!val) return
    addTodo({
      id: timer++,
      select: false,
      val: val
    })
    inputVal.current.value = ''
  }

  return <div className="control">
    <h2>TODO</h2>
    <form onSubmit={onSubmit}>
      <input type="text" ref={inputVal} className="new-val" placeholder="请输入" />
    </form>
  </div>
}

function Todos(props) {
  const { todos, toggleTodo, removeTodo } = props

  return <div className="todo-list">
    <ul>
      {todos.map(ele => {
        return <li key={ele.id}>
          <input type="checkbox" checked={ele.select} onChange={() => toggleTodo(ele.id)} />
          <label className={ele.select ? 'del' : ''}>{ele.val}</label>
          <span onClick={() => removeTodo(ele.id)}>X</span>
        </li>
      })}
    </ul>
  </div>
}




function TodoList() {
  const [todos, setTodos] = useState([])

  const addTodo = useCallback((todo) => {
    setTodos((todos) => [...todos, todo])
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos((todos) => todos.map(ele => {
      return ele.id === id ? { ...ele, select: !ele.select } : ele
    }))
  }, [])

  const removeTodo = useCallback((id) => {
    setTodos((todos) => todos.filter(ele => ele.id != id))
  }, [])

  useEffect(() => {
    let todoVal = JSON.parse(localStorage.getItem('todos', JSON.stringify(todos)) || 'todos')
    setTodos(todoVal)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])



  return <div className="todo">
    <Control addTodo={addTodo} />
    <Todos todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
  </div>
}


export default TodoList