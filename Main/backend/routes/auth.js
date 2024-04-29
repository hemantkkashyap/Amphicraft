import express from "express";
import rateLimit from "express-rate-limit";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js";
import Event from "../models/Event.js";
import {
  SendEmail,
  VerifyOTP,
  ResetPassword,
  SignUpSucess,
} from "../Controller/SendEmail.js";
import { newPayment, checkStatus } from "../Controller/PaymentController.js";
import Eventregistration from "../Controller/Eventregistration.js";
import Registerdevent from "../Controller/Registerdevent.js";
import Updation from "../models/Updation.js";
import Participant from "../models/Participant.js";
import Transactions from "../Controller/Transaction.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SRT = process.env.JWT_SECERT;

const router = express.Router();

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

router.post(
  "/createuser",
  limiter,
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("enrollment")
      .trim()
      .isLength({ min: 12 })
      .withMessage("Enrollment number must be at least 12 characters long"),
    body("college")
      .trim()
      .isLength({ min: 5 })
      .withMessage("College name must be at least 5 characters long"),
    body("branch")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Branch must be provided"),
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("contactno")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Contact number must be at least 10 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorResponse = {};
      errors.array().forEach((error) => {
        errorResponse[error.param] = error.msg;
      });
      return res.status(400).json({ errors: errorResponse });
    }

    try {
      let existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ email: "Email already exists" });
      }

      // Sanitize the enrollment before using it in the database query
      const sanitizedEnrollment = sanitize(req.body.enrollment);

      // Check if a user with the provided enrollment exists
      existingUser = await User.findOne({ enrollment: sanitizedEnrollment });

      // If a user with the enrollment already exists, send an appropriate error response
      if (existingUser) {
        return res
          .status(400)
          .json({ enrollment: "Enrollment number already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        name: req.body.name,
        enrollment: req.body.enrollment,
        college: req.body.college,
        branch: req.body.branch,
        email: req.body.email,
        password: secPass,
        contactno: req.body.contactno,
        isAdmin: req.body.isAdmin || false,
        isSubAdmin: req.body.isSubAdmin || false,
      });

      const payload = {
        user: {
          id: newUser.id,
        },
      };
      const token = jwt.sign(payload, JWT_SRT);

      await newUser.save();
      res.status(201).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/login",
  limiter,
  [
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("password", "Password cannot be blank!!").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const { email, password } = req.body;

      // Validate that email and password are provided
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      // Sanitize the email before using it in the database query
      const sanitizedEmail = sanitize(email);

      // Find the user by email
      const user = await User.findOne({ email: sanitizedEmail });

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Validate the password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const isAdmin = user.isAdmin;
      const isSubAdmin = user.isSubAdmin;
      const name = user.name;
      const useremail = user.email;

      payload.user.isAdmin = isAdmin;
      payload.user.isSubAdmin = isSubAdmin;
      payload.user.name = name;
      payload.user.useremail = useremail;
      const token = jwt.sign(payload, JWT_SRT);

      res.json({ token, isAdmin, isSubAdmin, name, useremail });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/getuser", limiter, fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    console.error("Error getting user:", error);
    if (error.kind === "ObjectId") {
      // Handle invalid user ID format error
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    // For other errors, return a generic internal server error message
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post(
  "/createevent",
  limiter,
  [
    body("eventname")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Event name must be at least 3 characters long"),
    body("category"),
    body("eventheading")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Details must have at least 20 characters"),
    body("eventdetail")
      .trim()
      .isLength({ min: 20 })
      .withMessage("Details must have at least 20 characters"),
    body("venue")
      .trim()
      .isLength({ min: 20 })
      .withMessage("Venue must have at least 20 characters"),
    body("eventdate"),
    body("timing")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Timing must have at least 5 characters"),
    body("entries")
      .trim()
      .isLength({ min: 1 })
      .withMessage("There must be Atleast 1 Entry"),
    body("coordinator1")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Coordinator1 Name must be at least 3 characters long"),
    body("coordinator2")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Coordinator2 Name must be at least 3 characters long"),
    body("publisher")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Publisher name must be at least 3 characters long"),
    body("price")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Enter Some Minimum Amount"),
    body("minparticipent")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Enter Some Minimum Amount"),
    body("maxparticipent")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Enter Some Minimum Amount"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { eventname } = req.body;

      // Validate that the event name is provided
      if (!eventname) {
        return res.status(400).json({ error: "Event name is required" });
      }

      // Sanitize the event name before using it in the database query
      const sanitizedEventName = sanitize(eventname);

      // Perform the database query using the sanitized event name
      const existingEvent = await Event.findOne({
        eventname: sanitizedEventName,
      });

      // Check if an event with the same name already exists
      if (existingEvent) {
        return res.status(400).json({ error: "Event already exists" });
      }

      const newEvent = new Event({
        eventname: req.body.eventname,
        category: req.body.category,
        eventheading: req.body.eventheading,
        eventdetail: req.body.eventdetail,
        venue: req.body.venue,
        eventdate: req.body.eventdate,
        timing: req.body.timing,
        entries: req.body.entries,
        coordinator1: req.body.coordinator1,
        coordinator2: req.body.coordinator2,
        publisher: req.body.publisher,
        price: req.body.price,
        minparticipent: req.body.minparticipent,
        maxparticipent: req.body.maxparticipent,
      });

      await newEvent.save();

      return res
        .status(201)
        .json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
      console.error("Error creating event:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

router.get("/events", limiter, async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/getallparticpent", limiter, async (req, res) => {
  try {
    const events = await Participant.find().populate("participants");
    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/details", limiter, async (req, res) => {
  try {
    const { eventname } = req.body;

    // Validate that the event name is provided
    if (!eventname) {
      return res.status(400).json({ error: "Event name is required" });
    }

    // Sanitize the event name before using it in the database query
    const sanitizedEventName = sanitize(eventname);

    // Perform the database query using the sanitized event name
    const event = await Event.findOne({ eventname: sanitizedEventName });

    // Check if the event exists
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Handle the case when the event is found
    return res.status(200).json({ event });
  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/subadmin", limiter, async (req, res) => {
  try {
    const subadmins = await User.find({ isSubAdmin: true });
    return res.status(200).json(subadmins);
  } catch (error) {
    console.error("Error fetching subadmins:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.put("/updateentry", limiter, async (req, res) => {
  const { name, useremail, eventname, entries } = req.body;

  try {
    // Validate inputs to ensure they are of the expected type and format
    if (
      typeof name !== "string" ||
      typeof useremail !== "string" ||
      typeof eventname !== "string"
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Sanitize inputs if necessary to prevent injection attacks
    const sanitizedName = sanitize(name);
    const sanitizedUserEmail = sanitize(useremail);
    const sanitizedEventName = sanitize(eventname);
    const sanitizedEntries = sanitize(entries);

    // Perform database operation using sanitized data
    const updatedEvent = await Event.findOneAndUpdate(
      { eventname: sanitizedEventName },
      { entries: sanitizedEntries },
      { new: true }
    );

    // Create a new entry in the Updation schema
    const newUpdation = new Updation({
      name: sanitizedName,
      useremail: sanitizedUserEmail,
      eventname: sanitizedEventName,
    });
    await newUpdation.save();
    // Send response or perform other actions as needed
    return res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getalluser", limiter, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/getupdate", limiter, async (req, res) => {
  try {
    const update = await Updation.find();
    return res.status(200).json(update);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/checkuser", limiter, async (req, res) => {
  const { email } = req.body;

  try {
    // Validate email format
    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Sanitize email to prevent NoSQL injection
    const sanitizedEmail = sanitize(email);

    // Find the user by email
    const user = await User.findOne({ email: sanitizedEmail });

    if (user) {
      // If user exists, send response indicating user exists
      res.json({ exists: true });
    } else {
      // If user does not exist, send response indicating user does not exist
      res.json({ exists: false });
    }
  } catch (error) {
    // If an error occurs, send error response
    console.error("Error checking user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/deleteAccount", limiter, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate email format
    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Sanitize email to prevent NoSQL injection
    const sanitizedEmail = sanitize(email);

    // Find the user by email
    const user = await User.findOne({ email: sanitizedEmail });

    // If user found, compare hashed password
    if (user) {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // If passwords match, delete the user
        await User.deleteOne({ email: sanitizedEmail });

        return res
          .status(200)
          .json({ message: "Account deleted successfully" });
      } else {
        // If password does not match, send error response
        return res.status(400).json({ error: "Invalid email or password" });
      }
    } else {
      // If user not found, send error response
      return res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/sendemail", limiter, SendEmail);
router.post("/verifyotp", limiter, VerifyOTP);
router.post("/resetpassword", limiter, ResetPassword);
router.post("/registersuccess", limiter, SignUpSucess);
router.post("/payment", limiter, newPayment);
router.post("/status/:txnId", limiter, checkStatus);
router.post("/eventregistration", limiter, Eventregistration);
router.post("/registerdevent", limiter, Registerdevent);
router.post("/transactions", limiter, Transactions);

export default router;
