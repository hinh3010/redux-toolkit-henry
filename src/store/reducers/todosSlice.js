// fetch api - kiểu mới
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

// reducer - thunk 
export const getTodos = createAsyncThunk('todos/todosFetched', async () => {
    // lấy từ server
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    // gửi về redux store qua extraReducers
    return response.data
})
export const addTodo = createAsyncThunk('todos/addTodo', async (title) => {
    const newTodo = {
        id: nanoid(),
        title: title,
        completed: false
    }
    // gửi lên server
    await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo)
    // gửi về redux store qua extraReducers
    return newTodo
})
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
    // gửi lên server
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
    // gửi về redux store qua extraReducers
    return todoId
})

// state
const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        allTodos: []
    },
    reducers: {
        toggleCompleted(state, action) {
            const todoId = action.payload
            state.allTodos.map(todo => {
                if (todo.id === todoId) todo.completed = !todo.completed
                return todo
            })
        }
    },
    // handle fetch api 
    extraReducers: {
        // get all todos
        [getTodos.pending]: (state, action) => {
            console.log('loading')
        },
        [getTodos.fulfilled]: (state, action) => {
            console.log({ data: action.payload })
            state.allTodos = action.payload
        },
        [getTodos.rejected]: (state, action) => {
            console.log('failed ... !')
        },
        // post new todo 
        [addTodo.pending]: (state, action) => {
            console.log('loading')
        },
        [addTodo.fulfilled]: (state, action) => {
            console.log({ data: action.payload })
            state.allTodos.unshift(action.payload)
        },
        [addTodo.rejected]: (state, action) => {
            console.log('failed ... !')
        },
        // delete todo theo id
        [deleteTodo.pending]: (state, action) => {
            console.log('loading')
        },
        [deleteTodo.fulfilled]: (state, action) => {
            console.log({ data: action.payload })
            state.allTodos = state.allTodos.filter(todo => todo.id !== action.payload)
        },
        [deleteTodo.rejected]: (state, action) => {
            console.log('failed ... !')
        },
    }
})

// reducer
const todosReducer = todosSlice.reducer

// selector
export const todosSelector = state => state.todoList.allTodos

// actions
export const { toggleCompleted } = todosSlice.actions

// export
export default todosReducer