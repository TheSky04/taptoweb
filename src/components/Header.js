import classes from "../classes/Header.module.css";

const Header = (props) => {
  return (
    props.onLogin && (
      <header>
        <nav className={classes.nav}>
          <h1>TaptoWeb</h1>
          <ul className={classes.list}>
            <li>
              <a href="#" onClick={props.onOpen}>
                Add Product
              </a>
            </li>

            <li>
              <a href="#" onClick={props.onLogout}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </header>
    )
  );
};

export default Header;
