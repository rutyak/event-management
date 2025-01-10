import React from "react";
import "./EventCard.css";

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="event-card">
      <h3 className="event-title">{event.name}</h3>
      <p className="event-description">{event.description}</p>
      <p className="event-location">
        <i className="fas fa-map-marker-alt"></i> {event.location}
      </p>
      <p className="event-date">
        <i className="fas fa-calendar-alt"></i> {new Date(event.date).toLocaleDateString()}
      </p>
      <div className="event-actions">
        <button className="edit-button" onClick={() => onEdit(event)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(event.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
