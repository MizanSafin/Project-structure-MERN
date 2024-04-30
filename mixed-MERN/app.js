const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//body-Parser
app.use(bodyParser.json());
mongoose.set("strictQuery", false);

//Security Middleware Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

//Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//Request Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//Mongodb connection
let URI = `mongodb://127.0.0.1:27017/StudentRegister`;
let OPTION = { user: "", pass: "", autoIndex: true };
mongoose
  .connect(URI, OPTION)
  .then(() => console.log("Database connected ."))
  .catch((err) => console.log(err));

// FrontEnd Tagging /Managing frontEnd Routing
app.use(express.static("client/dist"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

//Default roouting
app.use("/api/v1", router);

//Undefined Route
// app.use("*", (req, res) => {
//   res.status(404).json({ status: "fail", data: "Not found" });
// });

module.exports = app;
