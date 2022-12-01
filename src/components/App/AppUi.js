import React from "react";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";


function AppUi({
    loading,
    error,    
    totalTodos,
    completedTodos, 
    searchValue, 
    setSearchValue,
    searchedTodos, 
    completeTodo, 
    deleteTodo,
}) {
    return (
        <>    
        <TodoCounter
            total={totalTodos}
            completed={completedTodos} />
        <TodoSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue} />
        <TodoList>
            {loading && <p>La aplicación se esta iniciando</p>}
            {error && <p>aca deberia ir a una pagina de error</p>}
            {(!loading && !searchedTodos.length) && <p>No existen TODO, crea uno</p>}



            {searchedTodos.map(todo => (
            <TodoItem
                key={todo.text}
                text={todo.text}
                completed = {todo.completed} 
                onComplete = {() => completeTodo(todo.text)}
                onDelete = {() => deleteTodo(todo.text)}/>

            ))}
        </TodoList>
        <CreateTodoButton />
        </>
    )
};

export { AppUi };