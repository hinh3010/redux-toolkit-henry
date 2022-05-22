// fetch api - kiểu cũ
import { createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

// state
const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        allTodos: [
            { id: 1, title: 'learn react', completed: true },
            { id: 2, title: 'learn redux', completed: false },
            { id: 3, title: 'learn node-js', completed: false },
        ]
    },
    reducers: {
        // addTodo: (state, action) => {
        //     state.allTodos.unshift({
        //         id: nanoid(),
        //         title: action.payload,
        //         completed: false
        //     })
        // }

        // vì nanoid là cái ko lường trước đc => dùng cách này  - kiểu cũ
        addTodo: {
            reducer(state, action) {
                state.allTodos.unshift(action.payload)
            },
            prepare(title) {
                return {
                    payload: {
                        id: nanoid(),
                        title: title,
                        completed: false
                    }
                }
            }
        },
        toggleCompleted(state, action) {
            const todoId = action.payload
            state.allTodos.map(todo => {
                if (todo.id === todoId) todo.completed = !todo.completed
                return todo
            })
        },
        deleteTodo(state, action) {
            const todoId = action.payload
            state.allTodos = state.allTodos.filter(todo => todo.id !== todoId)
        },
        // fetch api - kiểu cũ
        todosFetched(state, action) {
            state.allTodos = action.payload
        },

    },
})

// async action creator : fetch api - kiểu cũ
export const getTodos = () => async dispatch => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        dispatch(todosFetched(response.data)) // lấy từ dưới dispath 1 [] data từ url
    } catch (error) {
        console.log(error.message)
    }
}

// reducer
const todosReducer = todosSlice.reducer

// selector
export const todosSelector = state => state.todoList.allTodos

// actions
export const {
    addTodo, //  - kiểu cũ
    toggleCompleted, deleteTodo,
    todosFetched// cần export cho getTodos phía trên nhận : fetch api - kiểu cũ
} = todosSlice.actions

// export
export default todosReducer