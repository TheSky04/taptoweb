import classes from "../classes/Login.module.css";
import { useRef } from "react";

const Login = (props) => {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const onWantHandler = () => {
    props.onWantHandler();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    props.onLoginHandler({
      username: enteredUsername,
      password: enteredPassword,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h3>Login</h3>
      <hr />
      <div className={classes.group}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={usernameInputRef} />
      </div>
      <div className={classes.group}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordInputRef} />
      </div>
      <p className={classes.want} onClick={onWantHandler}>
        want to have an account?
      </p>
      <button>Login</button>
    </form>
  );
};

export default Login;
