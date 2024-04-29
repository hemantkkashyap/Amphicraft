import React, { useState } from "react";
import "./Nav.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignOutAlt,
  faCalendar,
  faInfoCircle,
  faBars,
  faUsers,
  faCog,
  faUser,
  faNeuter,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { useCategory } from "../../Reduxstore/CategoryContext";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSidebarOpen } from "../../Reduxstore/reducers/action";

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

const Flexbar = ({ isOpen, setSidebarOpen }) => {
  const { setCategory } = useCategory();

  const closeSidebar = () => {
    setSidebarOpen(!isOpen); // Dispatch action to toggle sidebar state
  };

  const sidebarClass = isOpen ? "flexsidebar open" : "flexsidebar";
  const backshadowClass = isOpen ? "backshadow open" : "backshadow";

  const [showConfirmation, setShowConfirmation] = useState(false); // Define showConfirmation state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSubAdmin = useSelector((state) => state.auth.isSubAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    dispatch(setSidebarOpen(!isOpen)); // Dispatch action to update isOpen state
  };

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    dispatch({ type: "LOGOUT" }); // Dispatch action to update Redux store
    setShowConfirmation(false);
    navigate("/"); // Navigate to home page after logout
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value; // Access the selected value from the event object
    setCategory(selectedValue);
    closeSidebar();
    navigate("/event");
  };

  return (
    <>
      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />
      <div className={backshadowClass} onClick={closeSidebar}></div>
      <aside className={sidebarClass}>
        <div>
          <div className="part2">
            {/* Show user profile */}
            {isLoggedIn && (
              <Link to={"/profile"} onClick={closeSidebar}>
                <div className="profileitem">
                  <button className="profilelink">
                    <img src="./images/user.jpg" alt="" />
                  </button>
                  <p>Your Profile</p>
                </div>
              </Link>
            )}

            {/* Other sidebar items */}
            <Link to={"/"} onClick={closeSidebar}>
              <button className="flexitem">
                <FontAwesomeIcon
                  icon={faHome}
                  style={{ color: "white", fontSize: "1.3em" }}
                />
                <p>Home</p>
              </button>
            </Link>

            <Link to={"/about"} onClick={closeSidebar}>
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
                <Link to={"/admindash"} onClick={closeSidebar}>
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
                <Link to={"/contact"} onClick={closeSidebar}>
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
                <Link to={"/login"} onClick={closeSidebar}>
                  <button className="flexitem">
                    <FontAwesomeIcon
                      icon={faNeuter}
                      style={{ color: "white", fontSize: "1.3em" }}
                    />
                    <p>Login</p>
                  </button>
                </Link>
                <Link to={"/signup"} onClick={closeSidebar}>
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
      </aside>
    </>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.auth.isOpen, // Map isOpen state from Redux store to prop
});

// No need for mapDispatchToProps if you're directly dispatching an action creator as a prop

export default connect(mapStateToProps, { setSidebarOpen })(Flexbar);
