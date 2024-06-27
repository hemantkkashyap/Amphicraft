import './index.css';
import "../src/Components/Navbar/Nav.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop.js";
import { Provider } from "react-redux";
import store from "./Reduxstore/store";
import { CategoryProvider } from "./Reduxstore/CategoryContext"; // Import CategoryProvider
import ForgetPassword from "./Components/Home/ForgetPassword";
import Profile from "./Components/Home/Profile";
import Addevent from "./Components/SubAdmin/Addevent";
import Admin from "./Components/Admin/Admin";
import Subadmin from "./Components/Admin/Subadmin";
import Success from "./Components/Payment/Success";
import Failure from "./Components/Payment/Failure";
import Eventdetails from "./Components/Home/Events/Eventdetails";
import EventForm from "./Components/Home/Events/EventForm";
import Policy from "./Components/Footer/Policy";
import Refund from "./Components/Footer/Refund";
import Terms from "./Components/Footer/Terms";
import AdminDashboard from "./Components/Admin/AdminDashboard.js";
import Allusers from "./Components/Admin/Allusers.js";
import Allupdation from "./Components/Admin/Allupdation.js";
import SubadminDashboard from "./Components/SubAdmin/SubadminDashboard.js";
import AllParticipents from "./Components/SubAdmin/AllParticipents.js";
import Time from "./Components/Admin/Time.js";
import FourzeroFour from "./Components/FourzeroFour.js";
import Main from "./Components/Home/Main.js";
import NewNav from "./Components/Home/NewNav.js";
import Home from "./assets/Home/Home.jsx";
import Login from './assets/Home/Login.jsx';
import About from './assets/Home/About.jsx';
import Contact from './assets/Home/Contact.jsx';
import Signup from './assets/Home/Signup.jsx';
import Event from './assets/Home/Event.jsx';
import EventRegister from './assets/Home/EventRegister.jsx';

function App() {
  return (
    <>
      <Provider store={store}>
        <CategoryProvider>
          <Router>
            <ScrollToTop />
           {/*<NewNav/> */}
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/Signup" element={<Signup/>} />
              <Route exact path="/forget" element={<ForgetPassword />} />
              <Route exact path="/event" element={<Event/>} />
              <Route exact path="/profile" element={<Profile />} />
              <Route
                exact
                path="/subadmindash"
                element={<SubadminDashboard />}
              />
              <Route exact path="/admin" element={<Admin />} />
              <Route exact path="/subadmin" element={<Subadmin />} />
              <Route exact path="/success" element={<Success />} />
              <Route exact path="/failure" element={<Failure />} />
              {/* Render Eventdetails within a Route */}
              <Route exact path="/eventdetail" element={<Eventdetails />} />
              <Route exact path="/form" element={<EventForm />} />
              <Route exact path="/policy" element={<Policy />} />
              <Route exact path="/refund" element={<Refund />} />
              <Route exact path="/terms" element={<Terms />} />
              <Route exact path="/admindash" element={<AdminDashboard />} />
              <Route exact path="/alluser" element={<Allusers />} />
              <Route exact path="/allupdate" element={<Allupdation />} />
              <Route exact path="/time" element={<Time />} />
              <Route exact path="/addevent" element={<Addevent />} />
              <Route exact path="/register" element={<EventRegister/>} />
              <Route
                exact
                path="/allparticipent"
                element={<AllParticipents />}
              />
              <Route exact path="/404" element={<FourzeroFour />} />
            </Routes>
          </Router>
        </CategoryProvider>
      </Provider>
    </>
  );
}

export default App;
