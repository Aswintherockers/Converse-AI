import React, { useEffect } from "react";
import "./login.css";
import "../Chats/chat.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const userId = window.localStorage.getItem("userID");

  useEffect(() => {
    if (userId) {
      window.localStorage.removeItem("userID");
    }
  });

  const handleSignUpClick = () => {
    const container = document.querySelector(".container");
    container.classList.add("sign-up-mode");
    setEmail("");
    setPassword("");
  };

  const handleSignInClick = () => {
    const container = document.querySelector(".container");
    container.classList.remove("sign-up-mode");
    setEmail("");
    setPassword("");
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email: email,
        password: password,
      });
      window.localStorage.setItem("userID", res.data.userID);
      setEmail("");
      setPassword("");
      navigate("/home");
      toast.success("Welcome Back!");
    } catch (error) {
      console.log(error);
      toast.error("Email or password is incorrect!");
    }
  };
  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        email: email,
        password: password,
      });
      setEmail("");
      setPassword("");
      toast.success("Registered successfully!");
    } catch (error) {
      console.log(error);
      toast.error("User already exists!");
    }
  };

  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form" onSubmit={loginSubmit}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
            </form>
            <form action="#" className="sign-up-form" onSubmit={signupSubmit}>
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
              </div>
              <input type="submit" className="btn" value="Sign up" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Join our vibrant community now and unlock endless possibilities!
              </p>
              <button className="btn transparent" onClick={handleSignUpClick}>
                Sign up
              </button>
            </div>
            <img
              src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
              className="image"
              alt=""
            />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
              One of us? Login now and become part of the community!
              </p>
              <button className="btn transparent" onClick={handleSignInClick}>
                Sign in
              </button>
            </div>
            <img
              src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
              className="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
