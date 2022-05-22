import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { todosSelector } from '../../store/reducers/todosSlice';


function NavBar() {
    const todos = useSelector(todosSelector)
    return (
        <div className="navbar">
            <h1>My redux app todos</h1>
            <ul>
                <li>Home</li>
                <li>Aboult</li>
                <li>Total Todos : {todos.length} </li>
            </ul>
        </div>
    );
}

export default NavBar;