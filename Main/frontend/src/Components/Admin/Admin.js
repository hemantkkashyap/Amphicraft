import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";
import Alert from 'react-bootstrap/Alert';

function Admin() {
  const [step, setStep] = useState(1);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const [formData, setFormData] = useState({
    name: "",
    enrollment: "",
    branch: "",
    college: "",
    email: "",
    password: "",
    contactno: "",
    isAdmin: false,
    isSubAdmin: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://amphicraft-api.vercel.app/api/auth/createuser",
        formData
      );
      setFormData({
        name: "",
        enrollment: "",
        branch: "",
        college: "",
        email: "",
        password: "",
        contactno: "",
        isSubAdmin: true,
      });
      setAlertVariant("success");
      setAlertMessage("Subadmin added successfully");
      setShowAlert(true);
    } catch (error) {
      if (error.response) {
        const jsonResponse = error.response.data;
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
        } else {
          setAlertVariant("danger");
          setAlertMessage(jsonResponse.error || "Invalid credentials");
        }
      } else if (error.request) {
        setAlertVariant("danger");
        setAlertMessage("No response received from server");
      } else {
        setAlertVariant("danger");
        setAlertMessage("Error setting up request");
      }
      setShowAlert(true);
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
    else if(alertVariant === 'success'){
        return 'success';
    }
    return ''; // Default background color
  }


  return (
    <>
      <div className="Addevent">
        <div class="container">
          <input type="checkbox" id="signup_toggle" />
          <form class="form" onSubmit={handleSubmit}>
            <div class="form_front">
              <div className="part1">
                {step > 1 && (
                  <div className="prev" onClick={handlePrevStep}>
                    &lt;
                  </div>
                )}
                <h4>ADD NEW SUBADMIN</h4>
              </div>

              {step === 1 && (
                <div className="part2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter SubAdmin Name"
                    required
                  />
                  <input
                    type="text"
                    name="enrollment"
                    value={formData.enrollment}
                    onChange={handleChange}
                    placeholder="Enter SubAdmin ID"
                    required
                  />
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="InformationTechnology">
                      Information Technology
                    </option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mechnical">Mechnical</option>
                    <option value="Civil">Civil</option>
                    <option value="MBA">MBA</option>
                  </select>
                  <select
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select College</option>
                    <option value="SDBCT">SDBCT</option>
                    <option value="SDBCE">SDBCE</option>
                  </select>
                  <button className="nextbtn my-3" onClick={handleNextStep}>
                    Next
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="part2">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter SubAdmin Email"
                    required
                  />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Default Password"
                    required
                  />
                  <input
                    type="contactno"
                    name="contactno"
                    value={formData.contactno}
                    onChange={handleChange}
                    placeholder="Enter SubAdmin Contact No"
                    required
                  />
                  <button
                    className="nextbtn my-3"
                    id="submit-button"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              )}
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
    </>
  );
}

export default Admin;
