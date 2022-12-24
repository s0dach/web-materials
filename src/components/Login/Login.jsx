import React from "react";
import { AuthContext } from "../../context";
import "./style.css";
export const Login = () => {
  const { setIsAuth } = React.useContext(AuthContext);
  const [valueLogin, setValueLogin] = React.useState("");
  const [valuePassword, setValuePassword] = React.useState("");
  const login = (event) => {
    event.preventDefault();
    console.log("valueLogin", valueLogin);
    console.log("valuePassword", valuePassword);
    if (valueLogin === "editor" && valuePassword === "editorbot22") {
      setIsAuth(true);
      localStorage.setItem("auth", "true");
    } else {
      setIsAuth(false);
    }
  };
  return (
    <div>
      <div className="login-page">
        <div className="form">
          <form onSubmit={login} className="login-form">
            <span>Авторизация</span>
            <input
              onChange={(e) => setValueLogin(e.target.value)}
              type="text"
              placeholder="логин"
            />
            <input
              onChange={(e) => setValuePassword(e.target.value)}
              type="password"
              placeholder="пароль"
            />
            <button>войти</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
