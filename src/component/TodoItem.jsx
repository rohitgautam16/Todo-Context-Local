import React, { useState } from 'react';
import { useTodo } from '../context';

const TodoItem = ({ todo }) => {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [TodoMsg, setTodoMsg] = useState(todo.todo);
    const { deleteTodo, updateTodo, toggleComplete } = useTodo();

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: TodoMsg });
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    return (
        <div
            className={`flex items-center gap-x-3 p-3 rounded-lg shadow-md shadow-black/25 text-white duration-300 ${
                todo.completed ? "bg-[#303548]" : "bg-[#2a2a3c]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer accent-indigo-500"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`w-full bg-transparent rounded-md px-2 py-1 outline-none shadow-inner shadow-black/20 ${
                    isTodoEditable ? "border border-gray-500" : "border-transparent"
                } ${todo.completed ? "line-through text-gray-400" : "text-white"}`}
                value={TodoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="w-8 h-8 rounded-lg text-sm border border-transparent bg-[#44475a] text-gray-200 shadow-lg shadow-black/20 hover:bg-[#5a5f75] transition duration-150"
                onClick={() => {
                    if (todo.completed) return;
                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "💾" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="w-8 h-8 rounded-lg text-sm border border-transparent bg-[#ff5555] text-white shadow-lg shadow-black/20 hover:bg-[#ff6e6e] transition duration-150"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
};

export default TodoItem;
