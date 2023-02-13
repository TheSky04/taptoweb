import classes from "../classes/Register.module.css";
import { useRef } from "react";

const Register = (props) => {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const alreadyHandler = () => {
    props.onAlreadyHandler();
  };

  const registerSubmitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    props.onRegisterHandler({
      username: enteredUsername,
      password: enteredPassword,
    });
  };

  return (
    <form className={classes.form} onSubmit={registerSubmitHandler}>
      <h3>Register</h3>
      <hr />
      <div className={classes.group}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={usernameInputRef} />
      </div>
      <div className={classes.group}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordInputRef} />
      </div>
      <p className={classes.already} onClick={alreadyHandler}>
        have an account ?
      </p>
      <button>Register</button>
    </form>
  );
};

export default Register;
