import React, { useState} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
AOS.init({
  duration: 1000,
});


export default function Login() {

  const theme = useSelector((state) => state.auth.newTheme);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
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

  const onChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
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
      <section className="flex justify-center relative">
        <img
          src="https://pagedone.io/asset/uploads/1702362010.png"
          alt="gradient background image"
          className="w-full h-full object-cover fixed"
        />
        <div className="mx-auto max-w-lg px-6 lg:px-8 absolute py-20">
          <img
            src="images/craftlogo.png"
            alt="pagedone logo"
            className="mx-auto lg:mb-11 mb-8 h-[60px]"
          />
          <div className="rounded-2xl bg-white shadow-xl">
            <form action="" className="lg:p-11 p-7 mx-auto" onSubmit={handleSubmit}>
              <div className="mb-11">
                <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
                  Welcome Back
                </h1>
              </div>
              <input
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                placeholder="Username"
                type="email"
                    id="email"
                    name="email"
                value={credentials.email}
                    onChange={onChange}
              />
              <input
                
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1"
                placeholder="Password"
                name="password"
                    id="password"
                    autoComplete="current-password"
                value={credentials.password}
                    onChange={onChange}
              />
              <Link to={"/forget"} className="flex justify-end mb-6">
                <span className="text-indigo-600 text-right text-base font-normal leading-6">
                  Forgot Password?
                </span>
              </Link>
              <button className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-11" type="submit">
                Login
              </button>
              <Link
                to={"/signup"}
                className="flex justify-center text-gray-900 text-base font-medium leading-6"
              >
                {" "}
                Don’t have an account?{" "}
                <span className="text-indigo-600 font-semibold pl-3">
                  {" "}
                  Sign Up
                </span>
              </Link>
            </form>

            {showAlert && (
  <div className="p-4 mb-4 rounded bg-red-600 absolute top-5 right-5 transition-opacity duration-300 opacity-100" data-aos="fade-up" data-aos-offset="100">
    <div className="flex justify-between items-center">
      <span className="text-white">{alertMessage}</span>
      <button
        type="button"
        className="text-white ml-4"
        onClick={() => setShowAlert(false)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
)}



          </div>
        </div>
      </section>
    </>
  );
}
