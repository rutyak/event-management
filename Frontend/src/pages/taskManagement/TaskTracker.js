import React, { useState } from "react";
import "./TaskTracker.css";
import SearchBar from "../../components/searchbar/SearchBar";

const TaskTracker = () => {
  const [tasks] = useState([
    {
      id: 1,
      event: "Tech Meetup",
      task: "Setup Projector",
      deadline: "2025-01-15",
      status: "Pending",
    },
    {
      id: 2,
      event: "Tech Meetup",
      task: "Check Audio System",
      deadline: "2025-01-16",
      status: "Completed",
    },
    {
      id: 3,
      event: "Workshop on AI",
      task: "Prepare Presentation",
      deadline: "2025-01-20",
      status: "Pending",
    },
    {
      id: 4,
      event: "Networking Night",
      task: "Arrange Snacks",
      deadline: "2025-01-25",
      status: "Pending",
    },
    {
      id: 5,
      event: "Networking Night",
      task: "Setup Networking Booths",
      deadline: "2025-01-30",
      status: "Completed",
    },
  ]);

  const [events] = useState([
    "Tech Meetup",
    "Workshop on AI",
    "Networking Night",
  ]);

  const [selectedEvent, setSelectedEvent] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const taskFields = [
    {
      name: "taskName",
      type: "text",
      placeholder: "Enter Task Name",
      required: true,
    },
    {
      name: "deadline",
      type: "date",
      placeholder: "Select Deadline",
      required: true,
    },
    {
      name: "status",
      type: "select",
      placeholder: "Select Status",
      options: ["Pending", "Completed"],
      required: true,
    },
    {
      name: "assignedAttendee",
      type: "select",
      placeholder: "Assign to Attendee",
      options: ["John Doe", "Jane Smith", "Michael Brown"],
      required: true,
    },
  ];

  const attendees = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Brown" },
  ];

  const handleEventChange = (event) => {
    const selected = event.target.value;
    setSelectedEvent(selected);
    setFilteredTasks(tasks.filter((task) => task.event === selected));
  };

  const updateTaskStatus = (id) => {
    setFilteredTasks(
      filteredTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Pending" ? "Completed" : "Pending",
            }
          : task
      )
    );
  };

  function handleSubmit(formData, id) {
    console.log("Task submit clicked...");
    console.log("task formData : ", formData);
    console.log("task form id :", id)
  }

  return (
    <div className="task-tracker-container">
      <div className="task-header">
        <div className="dropdown-container">
          <label htmlFor="event-select" className="dropdown-label">
            Select Event:
          </label>
          <select
            id="event-select"
            value={selectedEvent}
            onChange={handleEventChange}
            className="dropdown"
          >
            <option value="" disabled>
              Choose an event
            </option>
            {events.map((event, index) => (
              <option key={index} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>
        <SearchBar
          btnTitle={"Add Task"}
          fields={taskFields}
          onSubmit={handleSubmit}
        />
      </div>

      {selectedEvent && filteredTasks.length === 0 && (
        <p className="no-tasks">No tasks available for the selected event.</p>
      )}
      {filteredTasks.length > 0 && (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Attendee</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.task}</td>
                <td>
                  <select>
                    <option value="" disabled>
                      Choose attendee
                    </option>
                    {attendees.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{task.deadline}</td>
                <td
                  className={
                    task.status === "Completed"
                      ? "status-completed"
                      : "status-pending"
                  }
                >
                  {task.status}
                </td>
                <td>
                  <button
                    className={`status-button ${
                      task.status === "Pending"
                        ? "complete-button"
                        : "pending-button"
                    }`}
                    onClick={() => updateTaskStatus(task.id)}
                  >
                    {task.status === "Pending"
                      ? "Mark as Completed"
                      : "Mark as Pending"}
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

export default TaskTracker;
