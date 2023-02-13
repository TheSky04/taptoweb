import classes from "../classes/AddProduct.module.css";
import Modal from "./Modal";
import { useRef, useState } from "react";

const AddProduct = (props) => {
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceInputRef = useRef();
  const [success, setSuccess] = useState(false);

  const addProductFormSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredPrice = +priceInputRef.current.value;

    if (
      enteredPrice < 0 ||
      enteredDescription.trim().length === 0 ||
      enteredName.trim().length === 0
    ) {
      return;
    }

    const willUploadData = { enteredName, enteredDescription, enteredPrice };

    props.onUploadData(willUploadData);

    nameInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    priceInputRef.current.value = "";

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <Modal onClose={props.onClose}>
      <form className={classes.form} onSubmit={addProductFormSubmitHandler}>
        {success && (
          <p className={classes.successMessage}>Ürün başarıyla Yüklendi.</p>
        )}
        <h3>Add Product</h3>
        <hr />
        <div className={classes.group}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
        <div className={classes.group}>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" ref={descriptionInputRef} />
        </div>
        <div className={classes.group}>
          <label htmlFor="price">Price</label>
          <input type="number" id="price" ref={priceInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Create Product</button>
          <button onClick={props.onClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProduct;
