import React, { useState, useEffect, useRef, useMemo, memo, useCallback } from 'react';
import { createSet, createAdd, createRemove, createToggle } from './actions'
import './todo.css'


const combineReducers = (reducers) => {
  return function reducer(state, action) {
    const changed = {}
    for (let key in reducers) {
      console.log(111)
      changed[key] = reducers[key](state[key], action)
    }
    return {
      ...state,
      ...changed
    }
  }
}

const bindActionCreaators = (actionCreate, dispatch) => {
  let ret = {}
  for (let key in actionCreate) {
    // 参数是不定的
    ret[key] = function (...args) {
      const actionCreator = actionCreate[key]
      console.log(args, '===args')
      const action = actionCreator(...args)
      dispatch(action)
    }
  }
  return ret
}

function Control(props) {
  const { addTodo } = props
  const inputVal = useRef()
  const onSubmit = (e) => {
    e.preventDefault()
    let val = inputVal.current.value.trim()
    if (!val) return
    addTodo(val)
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
  const { removeTodo, toggleTodo, todos } = props

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
// 异步操作数据时,新建个不在同一上下文中的数据,使数据同步
let store = {
  todos: [],
  incrmentCount: 0
}

function TodoList() {
  const [todos, setTodos] = useState([])
  const [incrmentCount, setIncrmentCount] = useState(0)

  useEffect(() => {
    Object.assign(store, { todos, incrmentCount })
  }, [todos, incrmentCount])

  const addTodo = useCallback((todo) => {
    setTodos((todos) => [...todos, todo])
    dispatch({ type: 'addTodo', payload: todo })
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
    dispatch(createSet(todoVal))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // const reducer = (state, action) => {
  //   const { todos, incrmentCount } = state
  //   const { type, payload } = action
  //   switch (type) {
  //     case 'set':
  //       return {
  //         ...state,
  //         todos: payload,
  //         incrmentCount: incrmentCount + 1
  //       }
  //     case 'add':
  //       return {
  //         ...state,
  //         todos: [...todos, payload],
  //         incrmentCount: incrmentCount + 1
  //       }
  //     case 'toggle':
  //       return {
  //         ...state,
  //         todos: todos.map(ele => {
  //           return ele.id === payload ? { ...ele, select: !ele.select } : ele
  //         })
  //       }
  //     case 'remove':
  //       return {
  //         ...state,
  //         todos: todos.filter(ele => ele.id != payload)
  //       }

  //     default:
  //       return {
  //         ...state,
  //       }
  //   }
  // }

  const reducers = {
    todos(state, action) {
      const { type, payload } = action
      switch (type) {
        case 'set':
          return payload;
        case 'add':
          return [...state, payload];
        case 'remove':
          return state.filter(ele => ele.id != payload);
        case 'toggle':
          return state.map(ele => ele.id === payload ? { ...ele, select: !ele.select } : ele);
        default:
          break;
      }
      return state
    },
    incrmentCount(state, action) {
      const { type, payload } = action
      switch (type) {
        case 'set':
        case 'add':
          return state + 1
        default:
          break;
      }
    }
  }

  const reducer = combineReducers(reducers)

  const dispatch = useCallback((action) => {
    // const state = {
    //   todos, incrmentCount
    // }
    let setter = {
      todos: setTodos, 
      incrmentCount: setIncrmentCount
    }
    if (typeof action === 'function') {
      // 3秒执行dispatch还在旧的上下文中,传给reducerstate还是旧的
      action(dispatch, () => store)
      return
    }

    let newState = reducer(store, action)

    for (let key in newState) {
      setter[key](newState[key])
    }

  }, [])


  return <div className="todo">
    <Control
      {
      ...bindActionCreaators({
        addTodo: createAdd
      }, dispatch)
      }
    />
    <Todos todos={todos}      {
      ...bindActionCreaators({
        removeTodo: createRemove,
        toggleTodo: createToggle
      }, dispatch)
    } />
  </div>
}


export default TodoList