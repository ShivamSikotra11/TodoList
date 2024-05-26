const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Function to check if the date is in the past
const isNotPastDate = (value) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Clear the time part to compare only the date
  return value >= today;
};

// Task sub-schema
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  dueDate: {
    type: Date,
    required: true,
    validate: [isNotPastDate, 'Due date cannot be in the past'],
  },
}, { _id: true }); // _id: true ensures that each task has a unique ID

// User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 1024,
    minlength: 8
  },
  tasks: [taskSchema] // Embedding task schema
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
