import classes from "../classes/ProductItem.module.css";
import IphoneImg from "../assets/iphone.png";

const ProductItem = (props) => {
  const price = `$${props.price}`;

  const promptWindow = () => {
    const answer = prompt(
      "Are you sure to delete the product ? If your answer is yes, please text yes. This movement cant get back."
    );
    if (answer.toLowerCase().trim() === "yes") {
      console.log("Product has been deleted.");
    }
  };

  return (
    <li className={classes.card}>
      <img src={IphoneImg} alt="Iphone" />
      <div className={classes.content}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <p>{price}</p>
        <div className={classes.actions}>
          <button onClick={promptWindow}>Delete</button>
          <button>Edit</button>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
