import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/reducers/todosSlice'

function TodoForm() {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('');
    const inputRef = useRef()

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title.trim()) {
            dispatch(addTodo(title.trim()))
            setTitle('')
            inputRef.current.focus()
        }
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <input
                style={{ border: '1px solid black' }}
                type="text"
                value={title}
                onChange={handleChange}
                ref={inputRef}
            />
            <button disabled={title.trim() ? false : true} type='submit'>Add</button>
        </form >
    );
}

export default TodoForm;