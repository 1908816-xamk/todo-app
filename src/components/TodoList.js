import React from "react";
import { Button, ListGroup } from "react-bootstrap";

// Näytetään yksittäinen todo-instanssi
const Todo = ({ update, remove, todo, dis }) => {
  let className = "normal";
  if (todo.states[0] === 2) {
    className = "underlined";
  }

  return (
    <ListGroup.Item key={todo.id}>
      <span className={className}>{todo.title.rendered}</span>
      <TodoButtons todo={todo} dis={dis} update={update} remove={remove} />
    </ListGroup.Item>
  );
};

// Näytetään listan painikkeet määritysten mukaan
const TodoButtons = ({ update, remove, todo, dis }) => {
    return (
      <div>
        {dis ? ( <Button variant="outline-secondary" onClick={() => { update(todo.id); }} disabled>✓</Button> )
          : ( <Button variant="outline-success" onClick={() => { update(todo.id); }}>✓</Button> )}
          {" "}<Button variant="outline-danger" onClick={() => { remove(todo.id); }}>✕</Button>
      </div>
    );
};

// Mapataan todo-taulukon instanssit, jotka kuuluvat johonkin filtteröityyn ryhmään
const TodoListFiltered = ({ todos, update, remove, dis, filter }) => {
  return todos.filter((todo) => todo.states[0] === filter).map((filteredTodo) => (
      <Todo todo={filteredTodo} dis={dis} update={update} remove={remove} />
    ));
};

// Mapataan kaikki todo-taulukon instanssit
const TodoListAll = ({ todos, update, remove, dis }) => {
  return todos.map((todo) => (
    <Todo todo={todo} dis={dis} update={update} remove={remove} />
  ));
};

export { TodoListFiltered, TodoListAll };
