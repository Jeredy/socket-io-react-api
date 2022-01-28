import React from "react";

import Notification from "../../img/notification.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";

import "./navbar.styles.css";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prevValues) => [...prevValues, data]);
    });
  }, [socket]);

  console.log(notifications);

  const displayNotification = ({ senderName, type }, index) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }

    return (
      <span
        key={index}
        className="notification"
      >{`${senderName} ${action} your post`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Lama App</span>
      <div className="icons">
        <div
          className="icon"
          onClick={() => setOpen((prevValue) => !prevValue)}
        >
          <img src={Notification} alt="" className="iconImg" />
          {!!notifications.length && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon">
          <img src={Message} alt="" className="iconImg" />
        </div>
        <div className="icon">
          <img src={Settings} alt="" className="iconImg" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n, index) => displayNotification(n, index))}
          <button className="notification-button" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
