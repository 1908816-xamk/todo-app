import React from "react";
import { Form } from "react-bootstrap";

const Title = ({ todoCount }) => {
  return (
    <div>
      <h1>To-do ({todoCount})</h1>
    </div>
  );
};

const TodoForm = ({ addTodo }) => {
  let input;

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(input.value);
        input.value = "";
      }}
    >
      <input
        className="form-control col-md-12"
        ref={(todo) => {
          input = todo;
        }}
      />
      <br />
    </Form>
  );
};

export { TodoForm, Title };
