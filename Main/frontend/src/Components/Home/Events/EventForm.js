import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Event.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function EventForm() {
  const maxparticipent = useSelector((state) => state.auth.maxparticipent);
  const eventname = useSelector((state) => state.auth.eventName);
  const price = useSelector((state) => state.auth.price);
  const transactionid = `T-${uuidv4()}`;
  const divArray = Array.from({ length: maxparticipent }, (_, index) => index);

  const [loading2, setLoading2] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading2(true);

    const name = document.getElementById(`name_${1}`);
    const contact = document.getElementById(`contact_${1}`);

    if (!name || !contact) {
      alert("Please provide name and contact number");
      return;
    }

    const firstNameValue = document.getElementById(`name_${1}`).value.trim();
    const firstEmailValue = document.getElementById(`email_${1}`).value.trim();
    const firstContactValue = document
      .getElementById(`contact_${1}`)
      .value.trim();
    const firstBranchValue = document
      .getElementById(`branch_${1}`)
      .value.trim();
    const firstSemValue = document.getElementById(`sem_${1}`).value.trim();
    // Check if the email is empty
    if (
      !firstEmailValue ||
      !firstContactValue ||
      !firstNameValue ||
      !firstBranchValue ||
      !firstSemValue
    ) {
      alert("Fill al the Fields of First Participents!!");
      return;
    }
    const participantDetails = {
      eventName: eventname,
      email: firstEmailValue, // Include event name
      transactionId: transactionid, // Generate transaction ID
      status: "Pending", // Set status as Pending
      participants: [], // Store participant details
    };

    for (let i = 1; i <= maxparticipent; i++) {
      const nameInput = document.getElementById(`name_${i}`);
      const emailInput = document.getElementById(`email_${i}`);
      const contactInput = document.getElementById(`contact_${i}`);
      const branchInput = document.getElementById(`branch_${i}`);
      const semInput = document.getElementById(`sem_${i}`);
      const participant = {
        name: nameInput ? nameInput.value : null,
        email: emailInput ? emailInput.value : null,
        contact: contactInput ? contactInput.value : null,
        branch: branchInput ? branchInput.value : null,
        sem: semInput ? semInput.value : null,
      };

      // Push participant into the participants array
      participantDetails.participants.push(participant);
    }

    console.log(participantDetails);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/eventregistration",
        participantDetails
      );

      if (response.status === 200) {
        const data = {
          name: name.value,
          number: contact.value,
          amount: price,
          MUID: `M-${uuidv4()}`,
          transactionId: transactionid,
        };
        axios
          .post("http://localhost:5000/api/auth/payment", data)
          .then((res) => {
            window.location.href = res.data;
          })
          .catch((error) => {
            setLoading2(false);
            console.error(error);
          });
      } else {
        console.error("Failed to save participant details.");
        // Handle failure here
      }
    } catch (error) {}
  };

  const theme = useSelector((state) => state.auth.newTheme);

  return (
    <>
      <div className={`Main ${theme}`}>
        <div className="eventdetails"></div>
        <div className="eventdetail">
          <div className="form">
            {divArray.map((index) => (
              <div className="Inputs" key={index}>
                <div className="participent">Participant {index + 1}</div>
                <div className="info">
                  <span>
                    <label htmlFor={`name_${index}`}>Name:</label>
                    <input
                      type="text"
                      id={`name_${index + 1}`}
                      name={`name_${index}`}
                    />
                  </span>
                  <span>
                    <label htmlFor={`email_${index}`}>Email:</label>
                    <input
                      type="email"
                      id={`email_${index + 1}`}
                      name={`email_${index}`}
                    />
                  </span>
                  <span>
                    <label htmlFor={`contact_${index}`}>Contact:</label>
                    <input
                      type="number"
                      id={`contact_${index + 1}`}
                      name={`contact_${index}`}
                    />
                  </span>
                  <span>
                    <label htmlFor={`branch_${index}`}>Branch:</label>
                    <input
                      type="text"
                      id={`branch_${index + 1}`}
                      name={`branch_${index}`}
                    />
                  </span>
                  <span>
                    <label htmlFor={`sem_${index}`}>Semester:</label>
                    <input
                      type="text"
                      id={`sem_${index + 1}`}
                      name={`sem_${index}`}
                    />
                  </span>
                </div>
              </div>
            ))}
            <button onClick={handlePayment}>Pay {price} Rs</button>
          </div>
        </div>
      </div>
    </>
  );
}
