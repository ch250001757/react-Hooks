 export function createSet(payload) {
   return {
     type: 'set',
     payload
   }
 }

 var timer = new Date()

 export function createAdd(text) {
   console.log(text, '====text')
   return (dispatch, getState) => {
     setTimeout(() => {
      const { todos } = getState()
      if (!todos.find(item => item.val === text)) {
        dispatch({
          type: 'add',
          payload: {
            id: ++timer,
            val: text,
            complete: false
          } 
        })
      }
     },3000)
   }
 }

 export function createRemove(payload) {
   return {
     type: 'remove',
     payload
   }
 }
 export function createToggle(payload) {
   return {
     type: 'toggle',
     payload
   }
 }