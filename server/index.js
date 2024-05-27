const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("./config");
const userModel = require("./models/users");

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://taskitinerary.netlify.app",
  "http://localhost:3000",
  "https://todo-list-topaz-gamma.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(401).json({ message: "User already exists" });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = new userModel({ name, email, password: hash });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.status(200).json({ message: "success", name: user.name });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/tasks/add_task", async (req, res) => {
  const { email, ...task } = req.body;
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { $push: { tasks: task } },
      { new: true }
    );
    res.status(200).json("successful");
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/tasks", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(200).json(user.tasks);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.tasks.pull({ _id: taskId });
    await user.save();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const { email, task } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { email, "tasks._id": taskId },
      { $set: { "tasks.$": task } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User or Task not found" });
    }
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (_, res) => {
  res.send("Welcome");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
