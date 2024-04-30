import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./Form.css";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://amphicraft-api.vercel.app/api/auth/sendemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Password Sent successfully!");
        setStep(2);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://amphicraft-api.vercel.app/api/auth/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: otpInputs.join("") }),
      });
      console.log(otpInputs.join(""));
      if (response.ok) {
        setStep(3);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://amphicraft-api.vercel.app/api/auth/resetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setStep(1);
        setError("");
        alert("Password reset successfully!");
      } else {
        const errorMessage = await response.json();
        setError(
          errorMessage.message || "An error occurred. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);

  const handleChange = (index, value, e) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newInputs = [...otpInputs];
      newInputs[index] = value;
      setOtpInputs(newInputs);
      if (index < otpInputRefs.current.length - 1 && value.length === 1) {
        otpInputRefs.current[index + 1].focus();
      } else if (index > 0 && e.keyCode === 8 && value.length === 0) {
        otpInputRefs.current[index - 1].focus();
      }
    }
  };

  const clearInputs = () => {
    setOtpInputs(["", "", "", "", "", ""]);
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && index > 0 && otpInputs[index] === "") {
      otpInputRefs.current[index - 1].focus();
    }
  };
  const theme = useSelector((state) => state.auth.newTheme);

  return (
    <>
      <div className={`Main ${theme}`}>
        <div className="ForgetPassword">
          <div className="contanier6">
            {step === 1 && (
              <div class="forget-container">
                <div class="logo-container">Forgot Password</div>
                <form class="forget" onSubmit={handleEmailSubmit}>
                  <div class="forget-group">
                    <label for="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      required=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button className="forget-submit-btn" type="submit">
                    Send Email
                  </button>
                </form>
                <p class="signup-link">
                  Don't have an account?
                  <Link to={"/signup"} class="signup-link link">
                    {" "}
                    Sign up now
                  </Link>
                </p>
              </div>
            )}
            {step === 2 && (
              <form class="otpform" onSubmit={handleOtpSubmit}>
                <div class="info">
                  <span class="title">Two-Factor Verification</span>
                  <p class="description">
                    Enter the two-factor authentication code provided by the
                    authenticator app{" "}
                  </p>
                </div>
                <div class="input-fields">
                  {otpInputs.map((input, index) => (
                    <input
                      key={index}
                      maxLength="1"
                      type="tel"
                      placeholder=""
                      value={input}
                      onChange={(e) => handleChange(index, e.target.value, e)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => (otpInputRefs.current[index] = el)}
                      required
                    />
                  ))}
                </div>
                <div class="action-btns">
                  <button class="verify" type="submit">
                    Verify
                  </button>
                  <button class="clear" type="button" onClick={clearInputs}>
                    Clear
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div class="login-box">
                <form onSubmit={handlePasswordSubmit}>
                  <div class="user-box">
                    <input
                      type="password"
                      name=""
                      required=""
                      maxLength="12"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label>New Password</label>
                  </div>
                  <div class="user-box">
                    <input
                      type="password"
                      name=""
                      required=""
                      maxLength="12"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label>Confirm New Password</label>
                  </div>
                  <center>
                    <button type="submit">
                      RESET
                      <span></span>
                    </button>
                  </center>
                </form>
              </div>
            )}
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
