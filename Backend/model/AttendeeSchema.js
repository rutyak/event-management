const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Email validation
  },
  assignedEvent: {
    type: String,
    required: true,
  },
});

const Attendee = mongoose.model('Attendee', attendeeSchema);

module.exports = Attendee;
