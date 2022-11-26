import { useState } from "react";
import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";
import { CreateTodoButton } from "./components/CreateTodoButton";

const defaultTodo = [
  { text: "Cortar cebolla", completed: false },
  { text: "Cortar pelo", completed: true },
  { text: "Terminar lo de adiunne", completed: true }
];

function App() {

  const [todos, setTodos] = useState(defaultTodo);

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

  const completeTodos = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos];
    newTodos[todoIndex].completed=true;

    setTodos(newTodos);
  }

  return (
    <>    
      <TodoCounter
        total={totalTodos}
        completed={completedTodos} />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue} />
      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed = {todo.completed} 
            onComplete = {() => completeTodos(todo.text)}/>
        ))}
      </TodoList>
      <CreateTodoButton />
    </>
  );
}

export default App;