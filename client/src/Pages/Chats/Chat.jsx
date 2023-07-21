import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./chat.css";
import { useNavigate } from "react-router";
import Footer from "../../Components/Footer";
import { toast } from "react-hot-toast";

function Chat() {
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const themeButtonRef = useRef(null);
  const [trigger, setTrigger] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [userText, setUserText] = useState("");
  const [reply, setReply] = useState([]);
  const [msg, setMsg] = useState([]);

  const userId = window.localStorage.getItem("userID");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/post", {
        userId: userId,
        msg: userText,
      });
      setTrigger(!trigger);
      setUserText("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/post/${userId}`);
        setMsg(res.data[0].message);
        setReply(res.data[0].reply);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [trigger]);

  useEffect(() => {
    chatContainerRef.current.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [reply]);

  const handleToggleTheme = () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem(
      "themeColor",
      document.body.classList.contains("light-mode")
        ? "light_mode"
        : "dark_mode"
    );
    setToggle(!toggle);
  };

  const handleDeleteChats = async () => {
    if (window.confirm("Are you sure you want to delete all the chats?")) {
      setMsg([]);
      setReply([]);
      try {
        await axios.delete(`http://localhost:5000/post/${userId}`);
        toast("Deleted", {
          icon: "🗑️",
        });
      } catch (error) {
        console.error(error);
        alert("Nothing to delete");
      }
    }
  };

  const handleclick = () => {
    window.localStorage.removeItem("userID");
    navigate("/");
    toast.success("Logged out!");
  };

  return (
    <>
      <div className="typing-container">
        <div className="typing-content">
          <div className="typing-textarea">
            <button
              onClick={handleclick}
              className="btnn"
              style={{ width: "60px", marginRight: "8px" }}
            >
              <i class="fa-solid fa-right-from-bracket"></i>
            </button>
            <textarea
              id="chat-input"
              spellCheck="false"
              placeholder="Enter a prompt here"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              required
            ></textarea>
            <span
              id="send-btn"
              className="material-symbols-rounded"
              onClick={handleSubmit}
            >
              <i class="fa-solid fa-paper-plane"></i>
            </span>
          </div>
          <div className="typing-controls">
            <span
              id="theme-btn"
              className="material-symbols-rounded"
              onClick={handleToggleTheme}
              ref={themeButtonRef}
            >
              {!toggle ? (
                <i class="fa-solid fa-moon"></i>
              ) : (
                <i class="fa-solid fa-sun"></i>
              )}
            </span>
            <span
              id="delete-btn"
              className="material-symbols-rounded"
              onClick={handleDeleteChats}
            >
              <i class="fa-solid fa-trash-can"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="chat-container" ref={chatContainerRef}>
        {msg.map((message, index) => (
          <div key={index}>
            <div className="chat-content">
              <div className="chat-details right">
                <p>{message}</p>
              </div>
            </div>
            <div className="chat-content">
              <div className="chat-details left">
                <p>{reply[index]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Chat;
