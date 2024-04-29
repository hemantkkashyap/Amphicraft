import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { setSidebarOpen, setTheme } from "../../Reduxstore/reducers/action";
import { useCategory } from "../../Reduxstore/CategoryContext";

function ConfirmationDialog({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="confirmation-dialog-container">
      <div className="confirmation-dialog">
        <p>Are you sure you want to logout?</p>
        <div>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { setCategory } = useCategory();
  const isOpen = useSelector((state) => state.auth.isOpen);
  const [showConfirmation, setShowConfirmation] = useState(false); // Define showConfirmation state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSubAdmin = useSelector((state) => state.auth.isSubAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.auth.newTheme); // Get theme from Redux store
  // State to track loading state of navigation
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => {
    dispatch(setSidebarOpen(!isOpen)); // Dispatch action to update isOpen state
  };

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    if (isLoggedIn) {
      dispatch({ type: "LOGOUT" }); // Dispatch action to update Redux store only if user is logged in
    }
    setShowConfirmation(false);
    navigate("/"); // Navigate to home page after logout
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  const handleCategoryChange = (category) => {
    console.log("Selected category:", category);
    setCategory(category);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"; // Toggle between light and dark themes
    dispatch(setTheme(newTheme)); // Dispatch action to update theme in Redux store
  };

  // Function to handle link clicks
  const handleLinkClick = () => {
    // Set loading state to true
    setLoading(true);
    // Simulate loading delay (you can replace this with actual loading logic)
    setTimeout(() => {
      setLoading(false);
    }, 0); // Example delay of 1 second
  };

  return (
    <>
      <div className={`Main ${theme}`}>
        <div className={`navbar ${theme}`}>
          <div className="part1">
            <FontAwesomeIcon
              id="bar"
              icon={faBars}
              style={{ fontSize: "1.8em" }}
              onClick={toggleSidebar}
            />

            {theme === "light" ? (
              <img src="images/Teamlogo.png" alt="Logo" />
            ) : (
              <img src="images/Teamlogo3.png" alt="Logo" />
            )}
          </div>
          <div className="part2">
            <Link to={"/"} onClick={handleLinkClick}>
              <button className="navitem">
                <p>Home</p>
              </button>
            </Link>

            <Link to={"/about"} onClick={handleLinkClick}>
              <button className="navitem">
                <p>About Us</p>
              </button>
            </Link>

            <div className="dropdown" id="navitem">
              <Link>
                <p>Events</p>
                <span className="material-symbols-outlined"></span>
              </Link>
              <div className="menu">
                <Link
                  to={"/event"}
                  onClick={() => {
                    handleCategoryChange("Indoor");
                    handleLinkClick();
                  }}
                >
                  Indoor
                </Link>
                <Link
                  to={"/event"}
                  onClick={() => {
                    handleCategoryChange("Outdoor");
                    handleLinkClick();
                  }}
                >
                  Outdoor
                </Link>
                <Link
                  to={"/event"}
                  onClick={() => {
                    handleCategoryChange("Tech");
                    handleLinkClick();
                  }}
                >
                  Tech
                </Link>
                <Link
                  to={"/event"}
                  onClick={() => {
                    handleCategoryChange("Cultural");
                    handleLinkClick();
                  }}
                >
                  Cultural
                </Link>
              </div>
            </div>

            {isLoggedIn && isAdmin ? (
              <Link to={"/admindash"} onClick={handleLinkClick}>
                <button className="navitem">
                  <p>Admin</p>
                </button>{" "}
              </Link>
            ) : isLoggedIn && isSubAdmin ? (
              <Link to={"/subadmindash"} onClick={handleLinkClick}>
                <button className="navitem">
                  <p>Subadmin</p>
                </button>{" "}
              </Link>
            ) : (
              <Link to={"/contact"} onClick={handleLinkClick}>
                <button className="navitem">
                  <p>Contact</p>
                </button>{" "}
              </Link>
            )}

            {isLoggedIn ? (
              <>
                <Link to={"/profile"} onClick={handleLinkClick}>
                  <button className="profilelink">
                    {" "}
                    <img src="./images/user.jpg" alt="" />
                  </button>
                </Link>
                <FontAwesomeIcon
                  id="logout"
                  icon={faSignOutAlt}
                  color="black"
                  onClick={handleLogout}
                />
                <ConfirmationDialog
                  isOpen={showConfirmation}
                  onClose={cancelLogout}
                  onConfirm={confirmLogout}
                />
              </>
            ) : (
              <>
                <Link to={"/login"} onClick={handleLinkClick}>
                  <button className="login">Login</button>
                </Link>

                <Link to={"/Signup"} onClick={handleLinkClick}>
                  <button className="sign">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Render Loader if loading 
       {loading && <Loader/>}*/}
    </>
  );
}
