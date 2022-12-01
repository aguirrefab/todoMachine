import { useState } from "react";
import { useEffect } from "react";
import { AppUi } from "./AppUi";

//const defaultTodo = [
//  { text: "Cortar cebolla", completed: false },
//  { text: "Cortar pelo", completed: true },
//  { text: "Terminar lo de adiunne", completed: true }
// ];

function useLocalStorage(itemName, initialValue){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);  
  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName)
      
        let parsedItem;
        
        if (!localStorageItem){
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = [];
        } else {
          parsedItem = JSON.parse(localStorageItem)
        };

        setItem(parsedItem);
        setLoading(false);
      } catch(error) {
        setLoading(error);
      };      
    }, 1000);
  });  
  

  const saveItemState = (newItem) => {
    try {
      const stringifyItem = JSON.stringify(newItem);
      localStorage.setItem("itemName", stringifyItem);
      setItem(newItem);
    } catch (error){
      setError(error);
    };
    
  };

  return{
    item,
    saveItemState,
    loading,
    error,
  };
}

function App() { 
  const {
    item: todos, 
    saveItemState, 
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

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

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos];
    newTodos[todoIndex].completed=true;

    saveItemState(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1)

    saveItemState(newTodos);
  };

  return (
    <AppUi
      loading = {loading}
      error = {error}
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