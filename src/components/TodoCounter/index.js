import React from "react";
import "./TodoCounter.css";

function TodoCounter({total, completed}){

    return  (
        <h1 className="TodoCounterTitle">Has completado { completed } de { total } Tareas</h1>
    );
}

export { TodoCounter };