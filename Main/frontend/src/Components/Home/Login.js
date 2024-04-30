import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loader from "../assets/Loader";

export default function Login() {
  const theme = useSelector((state) => state.auth.newTheme);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://amphicraft-api.vercel.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
  
      if (!response.ok) {
        // Handle different error statuses
        if (response.status === 401||response.status === 404) {
          throw new Error("Invalid email or password");
        } else if (response.status === 400) {
          throw new Error("Bad Request: Invalid input data");
        } else if (response.status === 500) {
          throw new Error("Internal Server Error: Please try again later");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
  
      const json = await response.json();
      if (json.token) {
        // Handle successful login
        localStorage.setItem("token", json.token);
        const isAdmin = json.isAdmin.toString();
        const isSubAdmin = json.isSubAdmin.toString();
        localStorage.setItem("name", json.name);
        localStorage.setItem("useremail", json.useremail);
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("isSubAdmin", isSubAdmin);
        setCredentials({ email: "", password: "" });
        setShowAlert(true);
        setAlertVariant("success");
        setAlertMessage("Login successful!"); 
        navigate("/");
        window.location.reload();
      } else {
        setShowAlert(true);
        setAlertVariant("danger");
        setAlertMessage(json.message || "Invalid credentials");
      }
    } catch (error) {
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertMessage(error.message);
    }
  };
  
  
  

  const onChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  function getAlertBgColor() {
    if (alertVariant === 'danger') {
      if (alertMessage.includes('400') || alertMessage.includes('401')) {
        return 'error';
      } else if (alertMessage.includes('500')) {
        return 'server-error';
      }
    }
    return ''; // Default background color
  }

  return (
    <>
      <div className={`Main ${theme}`}>
        <div className="Center">
          <div class={`form-container ${theme}`}>
            <form class="form" onSubmit={handleSubmit}>
              <span class="heading">LOGIN HERE !!</span>

              <div className="inputs">
                <div class="form-group">
                  <input
                    class="form-input"
                    required=""
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    autoComplete="email"
                  />
                  <label>Email</label>
                </div>

                <div class="form-group">
                  <input
                    class="form-input"
                    required=""
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={onChange}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={togglePasswordVisibility}
                    className="toggle-password-icon"
                    style={{ cursor: "pointer" }}
                  />
                  <label>Password</label>
                </div>
              </div>

              <button id="login" type="submit">
                Log In
              </button>

              <div className="part3">
                <p class="signup-link">
                  No account?&nbsp;&nbsp;
                  <Link to="/signup">Sign Up</Link>
                </p>

                <p>or</p>
                <Link to="/forget">Forget Your Password??</Link>
              </div>
            </form>
            {showAlert && (
               <Alert className={`alert ${getAlertBgColor()}`} variant={alertVariant} onClose={() => setShowAlert(false)}>
                 <div className="alert-content">
                   <span>{alertMessage}</span>
                   <button type="button" className="close" onClick={() => setShowAlert(false)}>
                     <span aria-hidden="true">×</span>
                   </button>
                 </div>
               </Alert>
             )}


          </div>
        </div>
      </div>
    </>
  );
}
