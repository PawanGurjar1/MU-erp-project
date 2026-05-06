import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import { addDummyAdmin } from "./controller/adminController.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);

// Port
const PORT = 5000;

// Test route
app.get("/", (req, res) => {
  res.send("Hello to college erp API");
});

// 🔥 FINAL MongoDB connection (DIRECT FIX)
mongoose
  .connect("mongodb://127.0.0.1:27017/collegeERP")
  .then(() => {
    console.log("MongoDB Connected (Local) ✅");
    addDummyAdmin();
    app.listen(5000, () =>
      console.log("Server running on port 5000 🚀")
    );
  })
  .catch((error) => console.log("Mongo Error", error));