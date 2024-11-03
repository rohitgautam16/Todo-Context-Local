import { useEffect, useState } from 'react';
import './App.css';
import { TodoProvider } from './context';
import TodoForm from './component/TodoForm';
import TodoItem from './component/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (todo, id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => 
      (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)
    ));
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#1e1e2e] min-h-screen min-w-max py-10">
        <div className="w-full max-w-2xl mx-auto bg-[#8b7fae] shadow-lg shadow-black/30 rounded-2xl p-6 text-gray-100">
          <h1 className="text-4xl font-extrabold text-center mb-8 mt-4 text-gray-50">Manage Your Todos</h1>
          <div className="mb-6">
            <TodoForm />
          </div>
          <div className="flex flex-col gap-y-4">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
