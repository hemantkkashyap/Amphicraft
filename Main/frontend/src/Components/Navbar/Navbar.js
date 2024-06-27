import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faBars,
  faBarsStaggered,
  faArrowLeft,
  faHome,
  faInfoCircle,
  faCalendar,
  faUser,
  faUsers,
  faNeuter,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
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

  // State to track active topic
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const theme = useSelector((state) => state.auth.newTheme); // Get theme from Redux store
  // State to track loading state of navigation
  const [loading, setLoading] = useState(false);

  /* const toggleSidebar = () => {
    dispatch(setSidebarOpen(!isOpen)); // Dispatch action to update isOpen state
  };*/

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value; // Access the selected value from the event object
    setCategory(selectedValue);
  toggleSidebar();
    navigate("/event");
  };

  return (
    <>
      <div className={`Main ${theme}`}>
        <div className={`${sidebarOpen ? "sidebar active" : "sidebar"}`}>
          <div className="close" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faArrowLeft}/>
          </div>
          <span>
              {theme === "light" ? (
                <img id="logo" src="images/craftlogo.png" alt="Logo" />
              ) : (
                <img id="logo" src="images/craftlogo.png" alt="Logo" />
              )}
            </span>
            <div className="part2">
            {/* Show user profile */}
            {isLoggedIn && (
              <Link to={"/profile"} onClick={toggleSidebar}>
                <div className="profileitem">
                  <button className="profilelink">
                    <img id="profileimage" src="./images/user.jpg" alt="" />
                  </button>
                  <p>Your Profile</p>
                </div>
              </Link>
            )}

            {/* Other sidebar items */}
            <Link to={"/"} onClick={toggleSidebar}>
              <button className="flexitem">
                <FontAwesomeIcon
                  icon={faHome}
                  style={{ color: "white", fontSize: "1.3em" }}
                />
                <p>Home</p>
              </button>
            </Link>

            <Link to={"/about"} onClick={toggleSidebar}>
              <button className="flexitem">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{ color: "white", fontSize: "1.3em" }}
                />
                <p>About Us</p>
              </button>
            </Link>

            <button className="flexitem">
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ color: "white", fontSize: "1.3em" }}
              />
              <select id="options" onChange={handleChange}>
                <option value="">Events</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Tech">Technical</option>
                <option value="Cultural">Cultural</option>
              </select>
            </button>

            {/* Check admin or subadmin before rendering */}
            {(isLoggedIn && isAdmin) || (isLoggedIn && isSubAdmin) ? (
              <>
                <Link to={"/admindash"} onClick={toggleSidebar}>
                  <button className="flexitem">
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: "white", fontSize: "1.3em" }}
                    />
                    <p>Admin</p>
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/contact"} onClick={toggleSidebar}>
                  <button className="flexitem">
                    <FontAwesomeIcon
                      icon={faUsers}
                      style={{ color: "white", fontSize: "1.3em" }}
                    />
                    <p>Contact Us</p>
                  </button>
                </Link>
              </>
            )}

            {/* Check if user is logged in before showing logout button */}
            {isLoggedIn ? (
              <>
                <button id="logout" className="flexitem" onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    style={{ color: "white", fontSize: "1.3em" }}
                  />
                  <p>Log Out</p>
                </button>
              </>
            ) : (
              <>
                <Link to={"/login"} onClick={toggleSidebar}>
                  <button className="flexitem">
                    <FontAwesomeIcon
                      icon={faNeuter}
                      style={{ color: "white", fontSize: "1.3em" }}
                    />
                    <p>Login</p>
                  </button>
                </Link>
                <Link to={"/signup"} onClick={toggleSidebar}>
                  <button className="flexitem">
                    <FontAwesomeIcon
                      icon={faSignIn}
                      style={{ color: "white", fontSize: "1.3em" }}
                    />
                    <p>Sign Up</p>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className={`navbar ${theme}`}>
          <div className="part1">
            <div id="bar" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBarsStaggered} />
            </div>

            <span>
              {theme === "light" ? (
                <img id="logo" src="images/Teamlogo.png" alt="Logo" />
              ) : (
                <img id="logo" src="images/Teamlogo3.png" alt="Logo" />
              )}
            </span>
          </div>
          <div className="part2">
            <Link to={"/"} onClick={handleLinkClick}>
              <button className="navitem">
                <p>HOME</p>
              </button>
            </Link>

            <Link to={"/about"} onClick={handleLinkClick}>
              <button className="navitem">
                <p>ABOUT US</p>
              </button>
            </Link>

            <div className="dropdown" id="navitem">
              <Link>
                <p>EVENTS</p>
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
                  <p>ADMIN</p>
                </button>{" "}
              </Link>
            ) : isLoggedIn && isSubAdmin ? (
              <Link to={"/subadmindash"} onClick={handleLinkClick}>
                <button className="navitem">
                  <p>SUBADMIN</p>
                </button>{" "}
              </Link>
            ) : (
              <Link to={"/contact"} onClick={handleLinkClick}>
                <button className="navitem">
                  <p>CONTACT</p>
                </button>{" "}
              </Link>
            )}

            {isLoggedIn ? (
              <>
                <Link to={"/profile"} onClick={handleLinkClick}>
                  <button className="profilelink">
                    {" "}
                    <img className="profileimage" src="" alt="" />
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
                  <div className="login">
                    <button>LOGIN</button>
                  </div>
                </Link>

                <Link to={"/Signup"} onClick={handleLinkClick}>
                  <div className="sign">
                    <button>SIGN UP</button>
                  </div>
                </Link>
              </>
            )}
            <div className="theme">
              <img src="moon.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
