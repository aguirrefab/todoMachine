import { useState } from "react";
import { AppUi } from "./AppUi";

//const defaultTodo = [
//  { text: "Cortar cebolla", completed: false },
//  { text: "Cortar pelo", completed: true },
//  { text: "Terminar lo de adiunne", completed: true }
// ];

function App() {
  
  const localStorageTodos = localStorage.getItem("TODOS_V1")

  let parsedTodos;

  if(!localStorageTodos){
    localStorage.setItem("TODOS_V1", JSON.stringify([]));
    parsedTodos = [];
  } else {
    parsedTodos = JSON.parse(localStorageTodos)
  }

  const [todos, setTodos] = useState(parsedTodos);

  const [searchValue, setSearchValue] = useState("");

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1){
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      
      return todoText.includes(searchText);
    })    
  }

  const saveTodosState = (newTodos) => {
    const stringifyTodos = JSON.stringify(newTodos);
    localStorage.setItem("TODOS_V1", stringifyTodos);
    setTodos(newTodos);
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos];
    newTodos[todoIndex].completed=true;

    saveTodosState(newTodos);
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1)

    saveTodosState(newTodos);
  }

  return (
    <AppUi
      totalTodos = {totalTodos}
      completedTodos = {completedTodos}
      searchValue = {searchValue}
      setSearchValue = {setSearchValue}
      searchedTodos = {searchedTodos}
      completeTodo = {completeTodo}
      deleteTodo =  {deleteTodo}      
      />    
  );
}

export default App;