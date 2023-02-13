import "./App.css";
import Header from "./components/Header";
import ProductItem from "./components/ProductItem";
import Register from "./components/Register";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import ErrorMessage from "./components/ErrorMessage";
import SuccessMessage from "./components/SuccessMessage";
import AddProduct from "./components/AddProduct";

function App() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // data: {username:...,password:...}

  // const getUsers = async () => {
  //   const response = await fetch(
  //     "https://react-http-8ec08-default-rtdb.firebaseio.com/users.json"
  //   );
  //   const data = await response.json();

  //   const users = [];
  //   for (let key in data) {
  //     users.push({
  //       id: key,
  //       username: data[key].username,
  //       password: data[key].password,
  //     });
  //   }

  //   return users;
  // };

  const registerHandler = (data) => {
    if (
      data.username.trim().length === 0 ||
      data.password.trim().length === 0
    ) {
      setError("All fields must be filled!");
      return;
    }

    fetch("https://react-http-8ec08-default-rtdb.firebaseio.com/users.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong!");
        response.json();

        setSuccess("Your registration has been successfully completed.");
        setTimeout(() => setSuccess(false), 1500);
        setTimeout(() => setIsRegistered(true), 1500);
      })
      .catch((err) => {
        setError(err.message);
        setTimeout(() => setError(false), 1500);
      });
  };

  const loginHandler = (data) => {
    setIsLoggedIn(true);
  };

  const alreadyHandler = () => {
    setIsRegistered(true);
  };

  const wantHandler = () => {
    setIsRegistered(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://react-http-8ec08-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) throw new Error("Something went wrong!");

      const responseData = await response.json();

      const productList = [];

      for (let key in responseData) {
        productList.push({
          id: key,
          description: responseData[key].description,
          price: responseData[key].price,
          title: responseData[key].title,
        });
      }

      setProducts(productList);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const productList = products.map((item) => (
    <ProductItem
      id={item.id}
      key={item.id}
      title={item.title}
      description={item.description}
      price={item.price}
    ></ProductItem>
  ));

  const showAddProductHandler = () => {
    setAddProduct(true);
  };

  const closeAddProductHandler = () => {
    setAddProduct(false);
  };

  const LogoutHandler = () => {
    setIsLoggedIn(false);
    setIsRegistered(false);
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  const uploadDataHandler = async (data) => {
    await fetch(
      "https://react-http-8ec08-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.enteredName,
          description: data.enteredDescription,
          price: data.enteredPrice,
        }),
      }
    );
  };

  return (
    <>
      <Header
        onOpen={showAddProductHandler}
        onLogout={LogoutHandler}
        onLogin={isLoggedIn}
      />
      {isLoggedIn && <ul className="list">{productList}</ul>}
      {success && <SuccessMessage text={success} />}
      {error && <ErrorMessage text={error} />}
      {!isRegistered && (
        <Register
          onRegisterHandler={registerHandler}
          onAlreadyHandler={alreadyHandler}
        />
      )}
      {isRegistered && !isLoggedIn && (
        <Login onWantHandler={wantHandler} onLoginHandler={loginHandler} />
      )}
      {addProduct && (
        <AddProduct
          onClose={closeAddProductHandler}
          onUploadData={uploadDataHandler}
        />
      )}
    </>
  );
}

export default App;
