import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import TodoForm from './components/TodoForm';
import Todos from './components/Todos';

function App() {
    return (
        <div className="App">
            <NavBar />
            <TodoForm />
            <Todos />
        </div>
    );
}

export default App;
