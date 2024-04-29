import React, { useState } from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const history = useNavigate();
  const [step, setStep] = useState(1);
  const [branch, setSelectedBranch] = useState("");
  const [college, setSelectedCollege] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    enrollment: "",
    branch: "",
    college: "",
    email: "",
    password: "",
    contactno: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleNextStep = () => {
    setStep(step + 1); // Increment step
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


  const handlePrevStep = () => {
    setStep(step - 1); // Decrement step
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      branch: event.target.value,
    }));
  };

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      college: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    if (
      !credentials.name ||
      !credentials.enrollment ||
      !credentials.branch ||
      !credentials.college ||
      !credentials.email ||
      !credentials.password ||
      !credentials.contactno
    ) {
      setAlertVariant("danger");
      setAlertMessage("Please fill in all fields.");
      setShowAlert(true);
      return;
    }
  
    try {
      const response = await fetch(
        "https://amphicraft.vercel.app/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            enrollment: credentials.enrollment,
            branch: credentials.branch,
            college: credentials.college,
            email: credentials.email,
            password: credentials.password,
            contactno: credentials.contactno,
          }),
        }
      );
  
      const jsonResponse = await response.json();
      if (response.ok) {
        // If user is registered successfully, send email
        history("/login");
        const emailResponse = await fetch(
          "https://amphicraft.vercel.app/api/auth/registersuccess",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: credentials.name,
              email: credentials.email,
              // You can pass additional data if required for sending the email
            }),
          }
        );
  
        if (emailResponse.ok) {
          // Email sent successfully
          setCredentials({
            name: "",
            enrollment: "",
            branch: "",
            college: "",
            email: "",
            password: "",
            contactno: "",
          });
          setAlertVariant("success");
          setAlertMessage("Registered Successfully! Email sent.");
          setShowAlert(true);
        } else {
          // Handle email sending error
          setAlertVariant("danger");
          setAlertMessage("Error sending email.");
          setShowAlert(true);
        }
      } else {
        // Handle specific error messages for each input field
        if (jsonResponse.errors) {
          const errorResponse = jsonResponse.errors.reduce((acc, error) => {
            acc[error.param] = error.msg;
            return acc;
          }, {});
          // Display specific error messages for each field
          if (errorResponse.name) {
            setAlertVariant("danger");
            setAlertMessage(errorResponse.name);
          } else if (errorResponse.enrollment) {
            setAlertVariant("danger");
            setAlertMessage(errorResponse.enrollment);
          } else if (errorResponse.branch) {
            setAlertVariant("danger");
            setAlertMessage(errorResponse.branch);
          } else if (errorResponse.college) {
            setAlertVariant("danger");
            setAlertMessage(errorResponse.college);
          } else if (errorResponse.email) {
            setAlertVariant("danger");
            setAlertMessage(errorResponse.email);
          } else if (errorResponse.password) {
            setAlertVariant("danger");
            setAlertMessage(errorResponse.password);
          } else if (errorResponse.contactno) {
            setAlertVariant("danger");
            setAlertMessage(errorResponse.contactno);
          }
          setShowAlert(true);
        } else {
          setAlertVariant("danger");
          setAlertMessage(jsonResponse.error || "Invalid credentials");
          setShowAlert(true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertVariant("danger");
      setAlertMessage("An error occurred. Please try again later.");
      setShowAlert(true);
    }
  };
  

  const onChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  const theme = useSelector((state) => state.auth.newTheme); // Get theme from Redux store

  return (
    <>
      <div className={`Main ${theme}`}>
        <div className="Center">
          <form onSubmit={handleSubmit}>
            <div className="signcontainer">
              <div className="part1">
                {step > 1 && (
                  <div className="prev" onClick={handlePrevStep}>
                    &lt;
                  </div>
                )}
                <p class="title">Register </p>
              </div>

              {step === 1 && (
                <div className="part2">
                  <label htmlFor="name">What's your Fullname?</label>
                  <input
                    className="my-2"
                    type="text"
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={onChange}
                  />
                  <label htmlFor="enrollment">What's your Enrollment No?</label>
                  <input
                    className="my-2"
                    type="text"
                    id="enrollment"
                    name="enrollment"
                    value={credentials.enrollment}
                    onChange={onChange}
                  />
                  <label htmlFor="branch">Select your Branch</label>
                  <select
                    className="my-2"
                    id="branch" // Corrected id
                    name="branch"
                    value={credentials.branch}
                    onChange={handleBranchChange}
                  >
                    <option value="">Select Branch</option>
                    <option value="IT">IT</option>
                    <option value="CS">CS</option>
                    <option value="EC">EC</option>
                    <option value="ME">ME</option>
                  </select>
                  <label htmlFor="college">Select your College</label>
                  <select
                    className="my-2"
                    id="college" // Corrected id
                    name="college"
                    value={credentials.college}
                    onChange={handleCollegeChange}
                  >
                    <option value="">Select College</option>
                    <option value="SDBCT">SDBCT</option>
                    <option value="SDBCE">SDBCE</option>
                  </select>
                  <button className="btn btn my-3" onClick={handleNextStep}>
                    Next
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="part2">
                  <label htmlFor="email">What's your e-mail?</label>
                  <input
                    id="email"
                    name="email"
                    className="my-2"
                    type="email"
                    value={credentials.email}
                    onChange={onChange}
                    autoComplete="email"
                  />
                  <label htmlFor="password">Your Password?</label>
                  <input
                    id="password"
                    name="password"
                    className="my-2"
                    type="password"
                    value={credentials.password}
                    onChange={onChange}
                  />
                  <label htmlFor="contactno">Phone Number</label>
                  <input
                    className="my-2"
                    type="tel"
                    value={credentials.contactno}
                    onChange={onChange}
                    name="contactno"
                    id="contactno"
                  />

                  <div class="form--marketing">
                    <span>
                      <input id="okayToEmail" type="checkbox" />
                    </span>
                    <label for="okayToEmail" class="checkbox">
                      I Accept Term's & Conditions
                    </label>
                  </div>

                  <button type="submit">Sign Up</button>
                </div>
              )}
              <div className="part3">
                <Link to="/login">Sign in with your account</Link>
              </div>
            </div>
          </form>
        </div>
        <div id="Alert" style={{ transform: "translate(-50%, -50%)" }}>
          <FontAwesomeIcon
            id="close"
            icon={faClose}
            onClick={() => setShowAlert(false)}
          />
        </div>
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
    </>
  );
}
