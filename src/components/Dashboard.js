import React from "react";
import TodoApp from "./TodoApp";
import axios from "axios";
import { Card } from "react-bootstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
    this.Logout = this.Logout.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const token = this.props.token;
    const userURI = this.props.url + "/wp-json/wp/v2/users/me";
    const _this = this;
    axios({
      method: "POST",
      url: userURI,
      headers: { Authorization: "Bearer " + token },
    })
      .then(function (res) {
        if (res.status === 200) {
          const data = res.data;
          _this.setState({ user: data });
        }
      })
      .catch(function (error) {
        _this.Logout();
      });
  }

  Logout() {
    localStorage.removeItem("login");
    this.props.setLogin("");
  }

  render() {
    const { nickname, first_name, last_name } = this.state.user;
    return (
      <div className="mt-3">
        <button type="button" className="btn btn-danger" onClick={this.Logout}>
          Kirjaudu ulos
        </button>
        <Card className="mt-3 mb-3">
          <Card.Body>
            <h5>Tervetuloa{" "}<b>{first_name} {last_name}</b></h5>
            <p>Olet kirjautunut sisään käyttäjänimellä{" "}<b>{nickname}</b></p>
          </Card.Body>
        </Card>
        <TodoApp />
      </div>
    );
  }
}

export default Dashboard;
