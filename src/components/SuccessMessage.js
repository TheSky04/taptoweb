import classes from "../classes/SuccessMessage.module.css";

const SuccessMessage = (props) => {
  return <div className={classes.successMessage}>{props.text}</div>;
};

export default SuccessMessage;
