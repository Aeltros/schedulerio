require('dotenv').config({path: './server/.env'})
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL);
const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("MongoDB connection is successful"); 
});

connection.on("error", (error) => {
 console.log("Error in MongoDB connection: ", error);
});

module.exports = mongoose;
