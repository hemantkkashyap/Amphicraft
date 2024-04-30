import React, { useEffect, useState } from "react";
import "./Home.css";
import { useSelector } from "react-redux";

export default function Profile() {
  const theme = useSelector((state) => state.auth.newTheme); // Get theme from Redux store

  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [token, setToken] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [inputEmail, setInputEmail] = useState(""); // State to manage input email
  const [inputPassword, setInputPassword] = useState(""); // State to manage input password
  const [emailExists, setEmailExists] = useState(false); // State to track if email exists in the database
  const [showPasswordInput, setShowPasswordInput] = useState(false); // State to toggle password input card visibility
  const [showTransactions, setShowTransactions] = useState(false); // State to toggle transaction section visibility
  const fetchUserData = () => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    if (!tokenFromLocalStorage) {
      console.error("No token found");
      return;
    }
    setToken(tokenFromLocalStorage);

    fetch("https://amphicraft-api.vercel.app/api/auth/getuser", {
      method: "POST",
      headers: {
        "auth-token": tokenFromLocalStorage,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        // Set the user data in state
        setUser(data);
        // Initialize updatedUser state with fetched user data
        setUpdatedUser(data);
        fetchRegisteredEvents(data.email); // Fetch registered events after user data is fetched
        fetchTransactions(data.email);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const fetchRegisteredEvents = (email) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    };

    fetch("https://amphicraft-api.vercel.app/api/auth/registerdevent", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch registered events");
        }
        return response.json();
      })
      .then((data) => {
        setRegisteredEvents(data.events);
      })
      .catch((error) => {
        console.error("Error fetching registered events:", error);
      });
  };
  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to fetch transactions
  const fetchTransactions = (email) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    };
    console.log(email);
    // Make an API call to fetch transactions
    fetch("https://amphicraft-api.vercel.app/api/auth/transactions", requestOptions)
      .then((response) => {
        if (!response.ok) {
          // Check if response status is not ok (status >= 400)
          throw new Error(response.status); // Throw the status code as an error
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data.transactions);
        setShowTransactions(true); // Show transaction section
      })
      .catch((error) => {
        if (error.message === "404") {
          // Check if the error message is "404"
          // Redirect to the 404 page
          window.location.href = "/404"; // Update the URL to match your 404 page route
        } else {
          console.error("Error fetching transactions:", error);
        }
      });
  };

  // Function to handle "Delete my account" button click
  const handleDeleteAccount = () => {
    // Check if the input email exists in the database
    fetch(`https://amphicraft-api.vercel.app/api/auth/checkuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: inputEmail }), // Send email as request body
    })
      .then((response) => response.json())
      .then((data) => {
        setEmailExists(data.exists);
        setShowPasswordInput(data.exists); // Show password input card if email exists
      })
      .catch((error) => {
        console.error("Error checking email:", error);
      });
  };

  const handleConfirmDelete = () => {
    // Send email and password to the server for verification
    fetch("https://amphicraft-api.vercel.app/api/auth/deleteAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: inputEmail, password: inputPassword }), // Send email and password as request body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete account");
        }
        localStorage.removeItem("token");
        // Refresh the page
        window.location.href = "/";
        return response.json();
      })
      .then((data) => {
        console.log("Account deleted successfully");
        // Optionally, you can redirect the user to a different page or show a success message
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        // Handle error response
        // You can show an error message to the user or handle the error in any other way
      });
  };

  // Function to handle close button click
  const handleClose = () => {
    setShowPasswordInput(false); // Hide the password input card
  };

  // Function to handle "Transactions" option click
  const handleTransactionsClick = () => {
    setShowTransactions((prevState) => !prevState);
  };

  const handleRegisterClick = () => {
    setShowTransactions((prevState) => prevState);
  };

  // Use useEffect to fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const dateString = user ? user.date : null;
  const dateObj = dateString ? new Date(dateString) : null;
  const month = dateObj
    ? dateObj.toLocaleString("default", { month: "long" })
    : null;
  const year = dateObj ? dateObj.getFullYear() : null;

  const generateBackgroundColor = (username) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  };

  return (
    <>
      <div className={`Main ${theme}`}>
        <div className="profile">
          <div className="bgimage">
            {user ? (
              <div className="Name">
                <p>{updatedUser.name}</p>
                <p id="date">
                  IN . Joined {month} {year} &nbsp;&nbsp;&nbsp;&nbsp;
                  {user.email}
                </p>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
          <div className="profilebox">
            <div
              className="box"
              style={{
                backgroundColor:
                  user && updatedUser.name
                    ? generateBackgroundColor(updatedUser.name)
                    : "gray",
              }}
            >
              <h1>
                {user &&
                  user.name &&
                  user.name
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .join("")}
              </h1>
            </div>
          </div>
          <div className="profilecontainer">
            <div className="part1">
              <p id="heading">Your Details</p>
              {user ? (
                <>
                  <p>{user.enrollment}</p>
                  <p>{user.branch}</p>
                  <p>{user.college}</p>
                  <p>{user.contactno}</p>
                </>
              ) : (
                <p>Loading user data...</p>
              )}
              <div></div>
            </div>
            <div className="part2">
              <div className="events">
                <p id="heading">Registered Events</p>
                {registeredEvents.length > 0 ? (
                  <ul className="registered-events-list">
                    {registeredEvents.map((event, index) => (
                      <li className="registered-event-item" key={index}>
                        {index + 1}.){event}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: "white" }}>No registered events found.</p>
                )}
              </div>
              <div className="account">
                <h2>My Account</h2>
                <p className="action">This action cannot be undone</p>
                <p>
                  This will Permanently delete your account,files, and personal
                  data from our systems.
                </p>
                <p>Please Type in your email to confirm</p>
                <div>
                  <input
                    type="text"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                  />
                  <button onClick={handleDeleteAccount}>
                    Delete my account
                  </button>
                </div>
                {showPasswordInput && (
                  <>
                    <div className="shadow"></div>
                    <div className="password-input-card">
                      <div className="close" onClick={handleClose}>
                        &times;
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your password"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)} // Update inputPassword state
                      />
                      <button onClick={handleConfirmDelete}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
