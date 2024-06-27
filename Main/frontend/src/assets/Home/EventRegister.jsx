import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const categoryColors = {
  Indoor: "/images/Slide1.png",
  Outdoor: "/images/Slide2.png",
  Tech: "/images/Slide3.png",
  Cultural: "/images/Slide4.png",
};

export default function EventRegister() {
  const location = useLocation();
  const { event } = location.state || {};
  const transactionid = `T-${uuidv4()}`;
  const divArray = Array.from({ length: event?.maxparticipent || 0 }, (_, index) => index);

  const [loading2, setLoading2] = useState(false);

  if (!event) {
    return <p>No event data found.</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

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
    const firstContactValue = document.getElementById(`contact_${1}`).value.trim();
    const firstBranchValue = document.getElementById(`branch_${1}`).value.trim();
    const firstSemValue = document.getElementById(`sem_${1}`).value.trim();

    if (
      !firstEmailValue ||
      !firstContactValue ||
      !firstNameValue ||
      !firstBranchValue ||
      !firstSemValue
    ) {
      alert("Fill all the fields of the first participant!!");
      return;
    }

    const participantDetails = {
      eventName: event.eventname,
      email: firstEmailValue,
      transactionId: transactionid,
      status: "Pending",
      participants: [],
    };

    for (let i = 1; i <= event.maxparticipent; i++) {
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

      participantDetails.participants.push(participant);
    }

    try {
      const response = await axios.post(
        "https://amphicraft-api.vercel.app/api/auth/eventregistration",
        participantDetails
      );

      if (response.status === 200) {
        const data = {
          name: name.value,
          number: contact.value,
          amount: event.price,
          MUID: `M-${uuidv4()}`,
          transactionId: transactionid,
        };
        axios
          .post("https://amphicraft-api.vercel.app/api/payment", data)
          .then((res) => {
            window.location.href = res.data;
          })
          .catch((error) => {
            setLoading2(false);
            console.error(error);
          });
      } else {
        console.error("Failed to save participant details.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section
        className="flex justify-center w-full h-auto border border-black"
        style={{
          backgroundImage: `url(${categoryColors[event.category]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center w-[50%] h-auto bg-white p-10">
          <p className="w-full text-4xl text-center mb-2">{event.eventname}</p>
          <p className="w-full text-lg mt-3">{event.eventdetail}</p>
          <p className="w-full text-lg mt-3">Coordinator : {event.coordinator1}</p>
          <p className="w-full text-lg mt-3">Coordinator : {event.coordinator2}</p>
          <p className="w-full text-lg mt-3">Category: {event.category}</p>
          <p className="w-full text-lg mt-3">Venue: {event.venue}</p>
          <p className="w-full text-lg mt-3">Time: {event.timing}</p>
          <p className="w-full text-lg mt-3">Entries: {event.entries}</p>
          <p className="w-full text-lg mt-3">Date: {formatDate(event.date)}</p>
          <p className="w-full text-lg mt-3">Max Participants: {event.maxparticipent}</p>

          <div className="w-full border border-bottom-black mt-5 mb-5"></div>

          <form className="flex flex-col justify-center gap-5 w-full" onSubmit={handlePayment}>
            {divArray.map((index) => (
              <div key={index} className="flex flex-wrap items-center">
                <p className="text-lg m-2">Participant {index + 1}</p>
                <div className="flex flex-wrap gap-2">
                <input
                  className="w-[250px] h-10 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4 mb-2"
                  placeholder="Enter Name"
                  type="text"
                  id={`name_${index + 1}`}
                  name={`name_${index}`}
                />
                <input
                  className="w-[250px] h-10 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4 mb-2"
                  placeholder="Enter Email"
                  type="email"
                  id={`email_${index + 1}`}
                  name={`email_${index}`}
                />
                <input
                  className="w-[250px] h-10 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4 mb-2"
                  placeholder="Enter Contact"
                  type="number"
                  id={`contact_${index + 1}`}
                  name={`contact_${index}`}
                />
                <input
                  className="w-[250px] h-10 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4 mb-2"
                  placeholder="Enter Branch"
                  type="text"
                  id={`branch_${index + 1}`}
                  name={`branch_${index}`}
                />
                <input
                  className="w-[250px] h-10 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4"
                  placeholder="Enter Semester"
                  type="text"
                  id={`sem_${index + 1}`}
                  name={`sem_${index}`}
                />
                </div>
              </div>
            ))}
            <button className="mt-5 px-4 py-2 text-white text-lg rounded-xl" type="submit" style={{
              backgroundImage: `url(${categoryColors[event.category]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
              Pay
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
