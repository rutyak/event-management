const createController = (model) => {
  return async (req, res) => {
    const {
      name,
      description,
      location,
      date,
      email,
      assignedEvent,
      taskName,
      assignedAttendee,
      deadline,
      status,
    } = req.body;

    console.log("Incoming data:", req.body);
    console.log("Model name:", model.modelName);

    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    try {
      let newData;

      switch (model.modelName) {
        case "Event":
          console.log("Creating Event...");
          newData = await model.create({
            name,
            description,
            location,
            date
          });
          break;

        case "Attendee":
          console.log("Creating Atttendee...");
          newData = await model.create({
            name,
            email,
            assignedEvent
          });
          break;

        case "Task":
          console.log("Creating Task...");
          newData = await model.create({
            taskName,
            assignedAttendee,
            deadline: formatDate(deadline),
            status,
          });
          break;

        default:
          console.error("Invalid model type");
          return res.status(400).json({ success: false, message: "Invalid model type" });
      }

      res.status(201).json({ success: true, data: newData });
    } catch (error) {
      console.error("Error creating data:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

module.exports = createController;
