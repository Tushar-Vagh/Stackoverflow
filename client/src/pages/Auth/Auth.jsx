import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";
const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const detectOs = () => {
    let operatingSystem = "Unknown OS";
    if (navigator.userAgent.indexOf("Win") !== -1) {
      operatingSystem = "Windows";
    } else if (navigator.userAgent.indexOf("Mac") !== -1) {
      operatingSystem = "MacOS";
    } else if (navigator.userAgent.indexOf("Android") !== -1) {
      operatingSystem = "Android";
    } else if (navigator.userAgent.indexOf("iOS") !== -1) {
      operatingSystem = "iOS";
    } else if (
      navigator.userAgent.indexOf("Linux") !== -1 ||
      navigator.userAgent.indexOf("X11") !== -1
    ) {
      if (navigator.userAgent.indexOf("Android") === -1) {
        operatingSystem = "Linux";
      }
    }
    return operatingSystem;
  };

  const detectBrowser = () => {
    let browser = "Unknown Browser";
    if (navigator.userAgent.indexOf("Edge") !== -1) {
      browser = "Edge";
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
      if (navigator.userAgent.indexOf("Edg") !== -1) {
        browser = "Edge";
      } else {
        browser = "Chrome";
      }
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
      browser = "Firefox";
    } else if (
      navigator.userAgent.indexOf("Opera") !== -1 ||
      navigator.userAgent.indexOf("OPR") !== -1
    ) {
      browser = "Opera";
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      browser = "Safari";
    } else if (
      navigator.userAgent.indexOf("MSIE") !== -1 ||
      navigator.userAgent.indexOf("Trident") !== -1
    ) {
      browser = "Internet Explorer";
    }
    return browser;
  };

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  const getUserIp = async () => {
    try {
      const ip = await axios.get("https://ipinfo.io/json?token=f48d762a86f0c1");
      return ip.data.ip;
    } catch (error) {
      console.log(error);
      return "unknown";
    }
  };

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDevice = {
      deviceType: isMobileDevice() ? "Mobile" : "Desktop or Laptop",
      os: detectOs(),
      browser: detectBrowser(),
      ip: await getUserIp(),
    };
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password, userDevice }, navigate));
    } else {
      dispatch(login({ email, password, userDevice }, navigate));
    }
  };

  return (
    <section class="auth-section">
      {isSignup && <AboutAuth />}
      <div class="auth-container-2">
        {!isSignup && (
          <img src={icon} alt="stack overflow" className="login-logo" />
        )}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            {isSignup && (
              <p style={{ color: "#666767", fontSize: "13px" }}>
                Passwords must contain at least eight
                <br />
                characters, including at least 1 letter and 1<br /> number.
              </p>
            )}
          </label>
          {isSignup && (
            <label htmlFor="check">
              <input type="checkbox" id="check" />
              <p style={{ fontSize: "13px" }}>
                Opt-in to receive occasional,
                <br />
                product updates, user research invitations,
                <br />
                company announcements, and digests.
              </p>
            </label>
          )}
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
          {isSignup && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              By clicking “Sign up”, you agree to our
              <span style={{ color: "#007ac6" }}>
                {" "}
                terms of
                <br /> service
              </span>
              ,<span style={{ color: "#007ac6" }}> privacy policy</span> and
              <span style={{ color: "#007ac6" }}> cookie policy</span>
            </p>
          )}
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
