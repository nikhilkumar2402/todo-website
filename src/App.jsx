import React, { useEffect, useState } from "react";
// import "./App.css";
import { TodoProvider } from "./Context/TodoContext";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
import { ThemeProvider } from "./Context/ThemeContext";
import ThemeBtn from "./Components/ThemeBtn";

const App = () => {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) =>{
    setTodos((prev) => prev.map((prevTodo)=> (prevTodo.id === id ? todo : prevTodo )))
  }

  const deleteTodo = (id) =>{
    setTodos((prev)=> prev.filter((todo)=> todo.id !== id))
  }

  const toggleComplete = (id) =>{
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo)))
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  // theme change code

  const [themeMode, setThemeMode] = useState('light')
  const lightMode = () =>{
    setThemeMode('light')
  }
  const darkMode = () =>{
    setThemeMode('dark')
  }
  useEffect(()=>{
    document.querySelector('html').classList.remove('light', 'dark')
    document.querySelector('html').classList.add(themeMode)
  },[themeMode])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, toggleComplete, deleteTodo}}>
      <ThemeProvider value={{themeMode, lightMode, darkMode}}>
      <div className="bg-gray-100 dark:bg-[#172842] min-h-screen py-8">
        <div className="relative inline-block top-0 left-[95%]">
            <ThemeBtn />
        </div>
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 dark:text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2 dark:text-white">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
      </ThemeProvider>
    </TodoProvider>
  );
};

export default App;
