import React, { useState } from 'react';
import { useTodo } from '../context';

const TodoForm = () => {
    const [todo, setTodo] = useState('');
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();
        if (!todo) return;
        addTodo({ todo, completed: false });
        setTodo('');
    };

    return (
        <form onSubmit={add} className="flex bg-[#1e1e2e] p-4 rounded-lg shadow-lg shadow-black/20">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-transparent rounded-l-lg px-4 py-2 bg-[#2a2a3c] text-white outline-none shadow-inner shadow-black/30 focus:shadow-md focus:shadow-indigo-500/50 transition duration-150"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button
                type="submit"
                className="rounded-r-lg px-4 py-2 bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-500/30 hover:bg-indigo-700 transition duration-200"
            >
                Add
            </button>
        </form>
    );
};

export default TodoForm;
