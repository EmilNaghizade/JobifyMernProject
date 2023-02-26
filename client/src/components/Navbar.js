import { useState } from "react";
import {Navigate} from "react-router-dom";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";

import Wrapper from "../assets/wrappers/Navbar";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";

const Navbar = () => {
  const { user, toggleSidebar, logoutUser } = useAppContext();
  let currentUser;
  if (user.name === undefined) {
    currentUser = user.user.name;
  }else{
    currentUser = user.name;
  }

  const [showLogout, setShowLogout] = useState(false);

  const logout =() => {
    logoutUser();
    return <Navigate to="/landing" />
  }
    
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {currentUser}
            <FaCaretDown />
          </button>
          <div className={showLogout ?  'dropdown show-dropdown' : 'dropdown'}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
