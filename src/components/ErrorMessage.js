import classes from "../classes/ErrorMessage.module.css";

const ErrorMessage = (props) => {
  return <div className={classes.errorMessage}>{props.text}</div>;
};

export default ErrorMessage;
