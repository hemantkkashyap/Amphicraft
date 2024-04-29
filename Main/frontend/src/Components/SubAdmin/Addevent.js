import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import "./Subadmin.css";
function Addevent() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1); // Increment step
  };

  const handlePrevStep = () => {
    setStep(step - 1); // Decrement step
  };

  // State variables to store form data
  const [eventData, setEventData] = useState({
    eventname: "",
    eventdate: "",
    eventheading: "",
    venue: "",
    timing: "",
    entries: "",
    eventdetail: "",
    coordinator1: "",
    coordinator2: "",
    publisher: "",
    price: "",
    category: "", // Added category field
    minparticipent: "",
    maxparticipent: "", // Added category field
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the server to create a new event
      const response = await axios.post(
        "https://amphicraft.vercel.app/api/auth/createevent",
        eventData
      );
      console.log("Event created:", response.data);
      // Clear the form after successful submission
      setEventData({
        eventname: "",
        eventdate: "",
        eventheading: "",
        venue: "",
        timing: "",
        entries: "",
        eventdetail: "",
        coordinator1: "",
        coordinator2: "",
        publisher: "",
        price: "",
        category: "", // Added category field
        minparticipent: "",
        maxparticipent: "",
      });
      // Show success alert
      window.alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      // Show error alert
      window.alert("Error creating event. Please try again.");
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };
  const theme = useSelector((state) => state.auth.newTheme); // Get theme from Redux store

  return (
    <>
      <div className={`Main ${theme}`}>
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
                  <h4>ADD NEW EVENTS!!</h4>
                </div>

                {step === 1 && (
                  <div className="part2">
                    <input
                      type="text"
                      name="eventname"
                      value={eventData.eventname}
                      onChange={handleChange}
                      placeholder="Event Name"
                      required
                    />
                    <select
                      name="category"
                      value={eventData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Indoor">Indoor</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Tech">Tech</option>
                      <option value="Cultural">Cultural</option>
                    </select>
                    <input
                      type="date"
                      name="eventdate"
                      value={eventData.eventdate}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="venue"
                      value={eventData.venue}
                      onChange={handleChange}
                      placeholder="Venue"
                      required
                    />
                    <button className="nextbtn my-3" onClick={handleNextStep}>
                      Next
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="part2">
                    <input
                      type="text"
                      name="timing"
                      value={eventData.timing}
                      onChange={handleChange}
                      placeholder="Timing"
                      required
                    />
                    <input
                      type="number"
                      name="entries"
                      value={eventData.entries}
                      onChange={handleChange}
                      placeholder="Enter Number of Entries"
                      required
                    />
                    <textarea
                      name="eventheading"
                      value={eventData.eventheading}
                      onChange={handleChange}
                      placeholder="Event Heading"
                      required
                    />
                    <textarea
                      name="eventdetail"
                      value={eventData.eventdetail}
                      onChange={handleChange}
                      placeholder="Event Detail"
                      required
                    />
                    <button className="nextbtn my-3" onClick={handleNextStep}>
                      Next
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <div className="part2">
                    <input
                      type="text"
                      name="coordinator1"
                      value={eventData.coordinator1}
                      onChange={handleChange}
                      placeholder="Coordinator 1"
                      required
                    />
                    <input
                      type="text"
                      name="coordinator2"
                      value={eventData.coordinator2}
                      onChange={handleChange}
                      placeholder="Coordinator 2"
                      required
                    />
                    <input
                      type="text"
                      name="publisher"
                      value={eventData.publisher}
                      onChange={handleChange}
                      placeholder="Publisher"
                      required
                    />
                    <input
                      type="number"
                      name="price"
                      value={eventData.price}
                      onChange={handleChange}
                      placeholder="Event Registration Price"
                      required
                    />
                    <button className="nextbtn my-3" onClick={handleNextStep}>
                      Next
                    </button>
                  </div>
                )}

                {step === 4 && (
                  <div className="part2">
                    <input
                      type="number"
                      name="minparticipent"
                      value={eventData.minparticipent}
                      onChange={handleChange}
                      placeholder="Min Participent"
                      required
                    />
                    <input
                      type="number"
                      name="maxparticipent"
                      value={eventData.maxparticipent}
                      onChange={handleChange}
                      placeholder="Max Participent"
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Addevent;
