import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { todosSelector, toggleCompleted, deleteTodo, getTodos } from '../../store/reducers/todosSlice';

function Todos(props) {

    const todos = useSelector(todosSelector)
    const dispatch = useDispatch()

    // fetch api 
    useEffect(() => {
        dispatch(getTodos())
    }, []);

    const handleCheckedTodo = (todoId) => {
        // console.log(todoId)
        dispatch(toggleCompleted(todoId))
    }

    const handleDeleteTodo = (todoId) => {
        // console.log(todoId)
        dispatch(deleteTodo(todoId))
    }

    return (
        <div className="todo-list">
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        {todo.title}
                        <input type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleCheckedTodo(todo.id)}
                        />
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todos;