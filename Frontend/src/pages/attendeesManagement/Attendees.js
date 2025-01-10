import React, { useState, useEffect } from "react";
import "./Attendees.css";
import SearchBar from "../../components/searchbar/SearchBar";
import { useAuthAndData } from "../../context/AuthAndDataContext";

const Attendees = () => {
  const { fetchData, createData, updateData, deleteData } = useAuthAndData();
  const [attendees, setAttendees] = useState([]);
  const [events] = useState([
    "Tech Meetup",
    "Workshop on AI",
    "Networking Night",
  ]);

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Attendee's name",
      label: "Name",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Attendee's email",
      label: "Email",
      required: true,
    },
    {
      name: "assignedEvent",
      type: "select",
      label: "Assigned Event",
      options: events,
      placeholder: "Select an event",
      required: true,
    },
  ];

  const loadAttendees = async () => {
    try {
      const response = await fetchData("attendee");
      if (response.success) {
        setAttendees(response.data);
      } else {
        console.error("Failed to fetch attendees");
      }
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  useEffect(() => {
    loadAttendees();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const response = await createData(formData, "attendee");
      if (response.success) {
        setAttendees((prev) => [...prev, response.data]);
      } else {
        console.error("Failed to create attendee");
      }
    } catch (error) {
      console.error("Error creating attendee:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await deleteData(id, "attendee");
      if (response.success) {
        setAttendees((prev) => prev.filter((attendee) => attendee.id !== id));
      } else {
        console.error("Failed to remove attendee");
      }
    } catch (error) {
      console.error("Error removing attendee:", error);
    }
  };

  const handleAssignEvent = async (attendeeId, event) => {
    try {
      const response = await updateData(attendeeId, { assignedEvent: event });
      if (response.success) {
        setAttendees((prev) =>
          prev.map((attendee) =>
            attendee.id === attendeeId
              ? { ...attendee, assignedEvent: event }
              : attendee
          )
        );
      } else {
        console.error("Failed to update attendee event");
      }
    } catch (error) {
      console.error("Error assigning event:", error);
    }
  };

  return (
    <div className="container">
      <SearchBar
        btnTitle="Add Attendee"
        fields={fields}
        onSubmit={handleSubmit}
      />
      {attendees.length === 0 ? (
        <p className="mo-attendees">No attendees added yet</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Assigned Event</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee.id}>
                <td>{attendee.name}</td>
                <td>{attendee.email}</td>
                <td>
                  <select
                    value={attendee.assignedEvent || ""}
                    onChange={(e) =>
                      handleAssignEvent(attendee.id, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select an Event
                    </option>
                    {events.map((event, index) => (
                      <option key={index} value={event}>
                        {event}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleRemove(attendee.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Attendees;
