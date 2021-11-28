import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

// Näytetään kaikki todo-taulukon instanssit
const TodoListAll = ({ todos, update, remove }) => {
  const todoNode = todos.map((todo) => {
    let className = "normal";
    if (todo.states[0] === 2) {
      className = "underlined";
    }
    return (
      <ListGroup.Item key={todo.id}>
        <span className={className}>{todo.title.rendered}</span>
        <div>
          <Button variant="outline-secondary" onClick={() => {update(todo.id);}} disabled>✓</Button>{" "}
          <Button variant="outline-danger" onClick={() => {remove(todo.id);}}>✕</Button>
        </div>
      </ListGroup.Item>
    );
  });
  return (
    <Card>
      <ListGroup>{todoNode}</ListGroup>
    </Card>
  );
};

// Näytetään todo-taulukon instanssit, jotka kuuluvat ryhmään "tehty"
const TodoListDone = ({ todos, update, remove }) => {
  const todoNode = todos.map((todo) => {
    if (todo.states[0] === 2) {
      return (
        <ListGroup.Item key={todo.id}>
          <span className="underlined">{todo.title.rendered}</span>
          <div>
            <Button variant="outline-secondary" onClick={() => {update(todo.id);}} disabled>✓</Button>{" "}
            <Button variant="outline-danger" onClick={() => {remove(todo.id);}}>✕</Button>
          </div>
        </ListGroup.Item>
      );
    }
  });
  return (
    <Card>
      <ListGroup>{todoNode}</ListGroup>
    </Card>
  );
};

// Näytetään todo-taulukon instanssit, jotka kuuluvat ryhmään "tekemättä"
const TodoListUndone = ({ todos, update, remove }) => {
  const todoNode = todos.map((todo) => {
    if (todo.states[0] === 3) {
      return (
        <ListGroup.Item key={todo.id}>
          {todo.title.rendered}
          <div>
            <Button variant="outline-success" onClick={() => {update(todo.id);}}>✓</Button>{" "}
            <Button variant="outline-danger" onClick={() => {remove(todo.id);}}>✕</Button>
          </div>
        </ListGroup.Item>
      );
    }
  });
  return (
    <Card>
      <ListGroup>{todoNode}</ListGroup>
    </Card>
  );
};

export { TodoListAll, TodoListDone, TodoListUndone };
