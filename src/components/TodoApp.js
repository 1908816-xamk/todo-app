import React from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import { TodoListAll, TodoListDone, TodoListUndone } from "./TodoList.js";
import { TodoForm, Title } from "./TodoForm.js";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.token = localStorage.getItem("login");
    this.apiUrl = "https://henritikkanen.info/temp/cm-headless-demo/wp/wp-json/wp/v2/to-do";
    this.headers = {
      "Authorization" : "Bearer" + this.token,
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    };
  }

  // Lifecycle-metodi latauksen yhteydessä, GET-pyyntö käyttäen API:lle
  componentDidMount() {
    axios.get(this.apiUrl + "/?per_page=100").then((res) => {
      this.setState({ data: res.data });
    });
  }

  // Lisäyksen käsittely, POST-pyyntö API:lle, tallenetaan uusi instanssi arrayn viimeiseksi
  addTodo(val) {
    const todo = { title: val, status: "publish", states: [3] };
    const headers = this.headers;

    axios.post(this.apiUrl, todo, { headers }).then((res) => {
      this.state.data.push(res.data);
      this.setState({ data: this.state.data });
      console.log(this.state.data);
    });
  }

  // Poiston käsittely, DELETE-pyyntö API:lle, poistetaan valittu id, filtteröidään jäljelle jääneet
  handleRemove(id) {
    const remainder = this.state.data.filter((todo) => {
      if (todo.id !== id) return todo;
    });
    const headers = this.headers;

    axios.delete(this.apiUrl + "/" + id, { headers }).then((res) => {
      this.setState({ data: remainder });
    });
  }

  // Päivityksen käsittely, PUT-pyyntö API:lle, etsitään objekti, kloonataan array mutatoinnin välttämiseksi ja korvataan päivitetyllä
  handleUpdate(id) {
    const todo = { states: [2] };
    const headers = this.headers;

    axios.put(this.apiUrl + "/" + id, todo, { headers }).then((res) => {
      const objIndex = this.state.data.findIndex((obj) => obj.id === id);
      const cloneData = [...this.state.data];
      cloneData[objIndex] = res.data;
      this.setState({ data: cloneData });
    });
  }

  render() {
    // Renderoidaan JSX-sisältö
    return (
      <div className="mb-5">
        <Title todoCount={this.state.data.length} />
        <TodoForm addTodo={this.addTodo.bind(this)} />
        <Tabs defaultActiveKey="unmade" id="todo-tabs" className="mb-3">
          <Tab eventKey="unmade" title="Tekemättä">
            <TodoListUndone
              todos={this.state.data}
              update={this.handleUpdate.bind(this)}
              remove={this.handleRemove.bind(this)}
            />
          </Tab>
          <Tab eventKey="done" title="Tehty">
            <TodoListDone
              todos={this.state.data}
              update={this.handleUpdate.bind(this)}
              remove={this.handleRemove.bind(this)}
            />
          </Tab>
          <Tab eventKey="all" title="Kaikki">
            <TodoListAll
              todos={this.state.data}
              update={this.handleUpdate.bind(this)}
              remove={this.handleRemove.bind(this)}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default TodoApp;
