import React from "react";
import { TextControl } from "@wordpress/components";
import { Button } from "react-bootstrap";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Lähetetään kirjautumisdata JWT-auth API:lle. Jos kirjautuminen ok, tallennetaan vastauksena saatu token local storageen.
  // Jos kirjautuminen epäonnistuu, otetaan talteen WP:n oma vastaus, poistetaan HTML-tagit ja näytetään käyttäjälle.
  handleSubmit(e) {
    e.preventDefault();
    const _this = this;
    axios
      .post(this.props.url + "/wp-json/jwt-auth/v1/token/", {
        username: this.state.username,
        password: this.state.password,
      })
      .then(function (res) {
        if (res.status === 200) {
          const data = res.data;
          localStorage.setItem("login", data.token);
          _this.props.setLogin(data.token);
        }
      })
      .catch(function (error) {
        function strip_html_tags(str) {
          if (str === null || str === "") return false;
          else str = str.toString();
          return str.replace(/<[^>]*>/g, "");
        }
        alert(strip_html_tags(error.response.data.message));
      });
  }

  handleUsername(username) {
    this.setState({ username });
  }

  handlePassword(password) {
    this.setState({ password });
  }
  render() {
    return (
      <form className="login" method="post">
        <TextControl
          className="form-group"
          label="Käyttäjänimi"
          value={this.state.username}
          onChange={(value) => this.handleUsername(value)}
        />
        <TextControl
          className="form-group"
          label="Salasana"
          type="password"
          onChange={(value) => this.handlePassword(value)}
        />
        <Button onClick={this.handleSubmit}>
          Kirjaudu sisään
        </Button>
      </form>
    );
  }
}

export default Login;
