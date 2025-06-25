import React from "react";
import "./Header.css";
import menuIcon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";
import uploadIcon from "../../assets/upload.png";
import moreIcon from "../../assets/more.png";
import notificationIcon from "../../assets/notification.png";
import profileIcon from "../../assets/jack.png";
import { Link } from "react-router-dom";

const Header = ({ setSidebar }) => {
  return (
    <nav className="flexDiv">
      <div className="navLeft flexDiv">
        <img
          className="menuIcon"
          onClick={() => setSidebar((prev) => (prev === false ? true : false))}
          src={menuIcon}
          alt=""
        />
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
      </div>
      <div className="navMiddle flexDiv">
        <div className="searchBox flexDiv">
          <input type="text" placeholder="Search" />
          <img src={searchIcon} alt="" />
        </div>
      </div>
      <div className="navRight flexDiv">
        <img src={uploadIcon} alt="" />
        <img src={moreIcon} alt="" />
        <img src={notificationIcon} alt="" />
        <img className="userIcon" src={profileIcon} alt="" />
      </div>
    </nav>
  );
};

export default Header;
