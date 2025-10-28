const express = require("express");
require("dotenv").config();
const app = express();
const { connectmono} = require("./connect"); // Make sure the path is correct
const cors = require("cors")
const morgan    = require("morgan")

app.use(morgan(":method :url :status :response-time ms - :res[content-length]"));
app.use(cors());

const urlroute = require("./routes/urlroute");
const { userInfo } = require("os");
const userRoutes = require("./routes/userRoutes");
// Middleware
app.use(express.json());

// Routes
app.use("/urls", urlroute);

//get short id
app.use("/url",urlroute)
app.use("/urla",urlroute)
app.use("/api/users", userRoutes);
// Start server and connect to database
app.listen(process.env.PORT, () => {
  connectmono(process.env.DATA)
    .then(() => {
      console.log(" Database connected successfully");
      console.log(` Server started successfully o port ${process.env.PORT}`);
    })
    .catch((err) => {
      console.error(" Database connection failed:", err);
    });
});
