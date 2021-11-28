import React, { useState, useEffect } from 'react';
import './App.scss';
import '@wordpress/components/build-style/style.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


function App() {
  const [login, setLogin] = useState("");
  const siteURL = "https://henritikkanen.info/temp/cm-headless-demo/wp";

  useEffect(() => {
    const localLogin = localStorage.getItem("login");
    if (localLogin) {
      setLogin(localLogin);
    }
  }, [login]);

  return (
    <div className="App container">
      <h1>Headless Wordpress Ylämummo</h1>
      {login && <Dashboard url={siteURL} token={login} setLogin={setLogin} />}
      {!login && <Login url={siteURL} setLogin={setLogin} />}
    </div>
  );
}

export default App;
