import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Chat from "./Pages/Chats/Chat";
import Login from "./Pages/Auth/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Check />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

function Check() {
  const userID = window.localStorage.getItem("userID");
  React.useEffect(() => {
    if (!userID) {
      toast.error("Login or Signup first");
    }
  }, [userID]);

  return userID ? <Chat /> : <Navigate to="/" />;
}
