// Server imports
const express = require("express"); // import express module
const app = express(); // create an instance of express
require("dotenv").config(); // import and config dotenv for environment variables
//const dbConfig = require("./config/dbConfig").default.default; // import db config 
const dbConfig = require("./config/dbConfig"); // import db config 


app.use(express.json()); // enable express to parse json data
//const routes = require('./routes') // import all routes from single file

const userRoute = require("./routes/userRoute"); // import user route handlers
const adminRoute = require("./routes/adminRoute"); // import admin route handlers
const doctorRoute = require("./routes/doctorsRoute"); // import doctor route handlers
const patientRoute=require("./routes/patientRoute"); // import patient route handlers
const path = require("path"); // import path module

// when an api request comes= with key word =====
// app.employee("/api/employee", employeeRoute);


//app.use('/api', routes); //use all routes on the '/api' endpoint

app.use("/api/patient", patientRoute); // use patient route handlers for requests on "/api/patient"
app.use("/api/user", userRoute); // use user route handlers for requests on "/api/user"
app.use("/api/admin", adminRoute); // use admin route handlers for requests on "/api/admin"
app.use("/api/doctor", doctorRoute); // use doctor route handlers for requests on "/api/doctor"

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname,"client/build")));
   // serve contents of client/build directory as the root of the website when in production


   
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html")); // send index.html as a response for any other route
  });
}
const port = process.env.PORT || 5000;

 // server port

app.get("/", (req, res) => res.send("Hello World!")); // handle request on "/" route
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`)); 
// start the server on specified port
