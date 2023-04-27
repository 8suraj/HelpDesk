import React, { useState } from "react";
import { io } from "socket.io-client";
import decode from "jwt-decode";
import "./navbar.styles.scss";
import { Link } from "react-router-dom";
import profile from "../../assest/svgs/profile.svg";
import { Outlet } from "react-router-dom";
import { CreateTicket, Notification,getToken } from "..";

export const NavbarRaiser = () => {
  const [popUp, setPopUp] = useState(false);
  const [notification, setNotification] = useState(false);
  const handler = () => {
    setPopUp(popUp + 1);
  };
  const Socket = io("http://localhost:7000/", {
  transportOptions: {
    polling: {
      extraHeaders: {
        'Authorization': `Bearer ${getToken()}`,
      },
    },
  },
});
 React.useEffect(()=>{
  Socket.on("connect", (socket) => {console.log("connected");});
  return ()=>{
    Socket.on("disconnect", (socket) => {console.log("disconnected");});
  }
 },[])
  
  Socket.on("notification",(data)=>{console.log(data);}) 
  return (
    <>
      <Notification
        open={notification}
        onClose={() => setNotification(false)}
      />
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
              <div className="nav__item" onClick={() => setNotification(true)}>
                <div className="nav__item-notification">
                  <div>154</div>
                  <img
                    src="data:image/png;base64,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"
                    alt="notification"
                  />
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
  const [notification, setNotification] = useState(false);
  const Socket = io("http://localhost:7000/", {
  transportOptions: {
    polling: {
      extraHeaders: {
        'Authorization': `Bearer ${getToken()}`,
      },
    },
  },
});
  React.useEffect(()=>{
  Socket.on("connect", (socket) => {console.log("connected");});
  return ()=>{
    Socket.on("disconnect", (socket) => {console.log("disconnected");});
  }
 },[])
  Socket.on("notification",(data)=>{console.log(data);}) 
  return (
    <>
      <Notification
        open={notification}
        onClose={() => setNotification(false)}
      />
      <div className="nav">
        <div className="nav__container">
          <nav>
            <Link to="/resolver">
              <div className="nav__p1">LOGO</div>
            </Link>
            <div className="nav__p2">
              {/* <Link to=>
              <div className="nav__item">Resolved Tickets</div>
              </Link> */}
              <Link to="">
                <div className="nav__item">Assigned Tickets</div>
              </Link>
              <Link to="tickets">
                <div className="nav__item">Tickets</div>
              </Link>
              <div className="nav__item">
                <div className="nav__item-profile">
                  <img src={profile} alt="profile" />
                </div>
              </div>
              <div className="nav__item" onClick={() => setNotification(true)}>
                <div className="nav__item-notification">
                  <div>154</div>
                  <img
                    src="data:image/png;base64,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"
                    alt="notification"
                  />
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
