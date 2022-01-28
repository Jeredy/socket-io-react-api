import React from "react";
import { io } from "socket.io-client";

import Navbar from "./components/navbar/navbar.component";
import Cards from "./components/cards/cards.component";

import { posts } from "./data.js";

import "./App.css";

const App = () => {
  const [username, setUsername] = React.useState("");
  const [user, setUser] = React.useState("");
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  React.useEffect(() => {
    user.length && socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Cards key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{username}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
