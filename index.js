const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/otp');

const userRoutes = require("./routes/userRoutes.js"); 

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api", userRoutes);

app.listen(PORT, () => {
    console.log(`App is working on port ${PORT}`);
});
