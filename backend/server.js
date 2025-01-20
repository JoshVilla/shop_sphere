import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import getUsers from "./controllers/register/register.js";
import register from "./controllers/register/addUser.js";
import loginCustomer from "./controllers/login/loginCutomer.js";
dotenv.config();

const app = express();

// Middleware for JSON parsing
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.ATLAS_DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to Atlas:", err));

app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

app.post("/register", register); // Register endpoint
app.get("/users", getUsers); // Get users endpoint

app.post("/login", loginCustomer);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
