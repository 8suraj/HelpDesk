import React from "react";
import "./navbar.styles.scss";
import profile from "../../assest/svgs/profile.svg";
import { Outlet } from "react-router-dom";
export const NavbarRaiser = () => {
  // const navigate = useNavigate();
  const clickHandler = () => {
    console.log("clicked");
  };
  return (
    <>
      <div className="nav">
        <div className="nav__container">
          <nav>
            <div className="nav__p1">LOGO</div>
            <div className="nav__p2">
              <div className="nav__item" onClick={clickHandler}>
                Create
              </div>
              <div className="nav__item">View</div>
              <div className="nav__item">
                <div className="nav__item-profile">
                  <img src={profile} alt="profile" />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export const NavbarResolver = () => {
  return (
    <>
      <div className="nav">
        <div className="nav__container">
          <nav>
            <div className="nav__p1">LOGO</div>
            <div className="nav__p2">
              <div className="nav__item">Resolve</div>
              <div className="nav__item">Assign</div>
              <div className="nav__item">View</div>
              <div className="nav__item">
                <div className="nav__item-profile">
                  <img src={profile} alt="profile" />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
