const express = require("express");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const emprouter = require("./router/Router");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
//port
const {PORT} = process.env;

app.use(express.json());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin: "https://employee-management-client.netlify.app",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
);
app.use("/employee", emprouter);
// app.use(express.static('./public'))

// app.get("/emp", (req, res) => {
//   res.json(200);
// });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);

  mongoose.connect(process.env.MONGODB_URL)
  .then((res) => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });
});
