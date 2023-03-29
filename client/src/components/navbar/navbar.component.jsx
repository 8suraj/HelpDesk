import React, { useState } from "react";
import "./navbar.styles.scss";
import { Link } from "react-router-dom";
import profile from "../../assest/svgs/profile.svg";
import { Outlet } from "react-router-dom";
import { CreateTicket } from "..";
export const NavbarRaiser = () => {
  const [popUp, setPopUp] = useState(false);
  const handler = () => {
    setPopUp(popUp + 1);
  };
  return (
    <>
      <div className="nav">
        <div className="nav__container">
          <nav>
            <Link to="/raiser">
              <div className="nav__p1">LOGO</div>
            </Link>
            <div className="nav__p2">
              <div className="nav__item" onClick={handler}>
                Create
              </div>
              <Link to="tickets">
                <div className="nav__item">Tickets</div>
              </Link>
              <div className="nav__item">
                <div className="nav__item-profile">
                  <img src={profile} alt="profile" />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {popUp && <CreateTicket visibility={popUp} />}
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
            <Link to="/resolver">
              <div className="nav__p1">LOGO</div>
            </Link>
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
      <Outlet />
    </>
  );
};
