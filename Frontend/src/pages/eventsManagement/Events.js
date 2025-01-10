import React, { useEffect, useState } from "react";
import "./Events.css";
import EventCard from "../../components/cards/EventCard";
import SearchBar from "../../components/searchbar/SearchBar";
import { useAuthAndData } from "../../context/AuthAndDataContext";

const Events = () => {
  const { createData, fetchData, updateData, deleteData } = useAuthAndData();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetchData("event");
        if (response.success) {
          setEvents(response.data);
          console.log("events: ",response.data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    loadEvents();
  }, [fetchData]);

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Event Name",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      placeholder: "Event Description",
      required: true,
    },
    {
      name: "location",
      type: "text",
      placeholder: "Event Location",
      required: true,
    },
    {
      name: "date",
      type: "date",
      placeholder: "Event Date",
      required: true,
    },
  ];

  const handleEdit = async (event) => {
    const updatedData = { ...event, name: `${event.name} (Updated)` };
    try {
      await updateData(updatedData, "event");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteData(eventId, "event");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await createData(formData, "event");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="event-container">
      <SearchBar
        btnTitle="Add New Event"
        fields={fields}
        onSubmit={handleSubmit}
      />
      <div className="event-grid">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={() => handleEdit(event)}
              onDelete={() => handleDelete(event.id)}
            />
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
};

export default Events;
