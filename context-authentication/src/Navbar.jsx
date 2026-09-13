import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";

const Navbar = () => {
  const { isLoggedIn, Login, Logout } = useContext(UserContext);

  return (
    <nav className="navbar">
      <h1>App</h1>

      {isLoggedIn && <span>Welcome Back Vivek 👦</span>}
      {isLoggedIn ? (
        <button className="button" onClick={Logout}>Logout</button>
      ) : (
        <button className="button" onClick={Login}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;