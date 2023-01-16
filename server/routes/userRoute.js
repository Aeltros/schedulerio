const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const moment = require("moment");



// Register route
router.post("/register", async (req, res) => { 
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists in DB/UserRoute Error", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
});



// login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {

      // generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
        console.log(token);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});


router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res 
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});


// APPLY FOR A NEW role//doctor
router.post("/apply-doctor-account", authMiddleware, async (req, res) => {
  try {
    const newdoctor = new Doctor({ ...req.body, status: "pending" });
    // save applicant
    await newdoctor.save();
    // find one admin and notify
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-provider -request for credential approval",
      message: `${newdoctor.firstName} ${newdoctor.lastName} has appliedto be a provider. Please check credentials and approve`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onClickPath: "/admin/doctorslist",
    });

    await User.findByIdAndUpdate(adminUser._id, {unseenNotifications});
    res.status(200).send({
      success: true,
      message: "Applied for Provider Account",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: "Error applying for a provider  account",
      success: false,
      error,
    });
  }
});


// APPLY FOR A NEW role/patient role

router.post("/apply-patient-account", authMiddleware, async (req, res) => {
  try {
    const newpatient = new Patient({ ...req.body, status: "pending" });
    // save applicant
    await newpatient.save();
    // find one admin and notify
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-patient -request for admissions",
      message: `${newpatient.firstName} ${newpatient.lastName} has appliedto be a patient. Please check credentials and approve`,
      data: {
        patientId: newpatient._id,
        name: newpatient.firstName + " " + newpatient.lastName,
      },
      onClickPath: "/admin/patientslist",
    });

    await User.findByIdAndUpdate(adminUser._id, {unseenNotifications});
    res.status(200).send({success: true,message: "Successfully Applied for Admission",});
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: "Error applying for a patient  account",
      success: false,
      error,
    });
  }
});


// Message handler routes
router.post("/send-message", authMiddleware, async (req, res) => {
  try {
    const sender = await User.findOne({ _id: req.user });
    const recipient = await User.findOne({ email: req.body.email });
    if (!recipient) {
      return res
        .status(200)
        .send({ message: "Recipient does not exist", success: false });
    }
    const message = {
      sender: sender.name,
      message: req.body.message,
      date: new Date()
    };
    sender.sentMessages.push(message);
    recipient.receivedMessages.push(message);
    await sender.save();
    await recipient.save();
    res
      .status(200)
      .send({ message: "Message sent successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error sending message", success: false, error });
  }
});
// Fetch Messages

router.get("/messages", authMiddleware, async (req, res) => {
  try {
    // Find the user in the database
    const user = await User.findOne({ _id: req.user });
    // Fetch the user's sent and received messages
    const sentMessages = user.sentMessages;
    const receivedMessages = user.receivedMessages;
    // Send the messages back to the client
    res.status(200).send({
      success: true,
      sentMessages: sentMessages,
      receivedMessages: receivedMessages
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching messages",
      error: error
    });
  }
});

// get notifications
router.get("/notifications", authMiddleware, async (req, res) => {
  try {
    // Find the user in the database
    const user = await User.findOne({ _id: req.user });
    // Fetch the user's seen and unseen notifications
    const seenNotifications = user.seenNotifications;
    const unseenNotifications = user.unseenNotifications;
    // Send the notifications back to the client
    res.status(200).send({
      success: true,
      seenNotifications: seenNotifications,
      unseenNotifications: unseenNotifications,
      unreadNotifications: unseenNotifications.length
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching notifications",
      error: error
    });
  }
});
// get Messages
router.get("/messages", authMiddleware, async (req, res) => {
try {
const user = await User.findOne({ _id: req.user.id });
if (!user) {
return res.status(404).send({ message: "User not found" });
}
res.status(200).send({
receivedMessages: user.receivedMessages,
sentMessages: user.sentMessages,
});
} catch (error) {
console.log(error);
res.status(500).send({ message: "Error fetching messages" });
}
});


// delete
router.delete("/messages/:id", authMiddleware, async (req, res) => {
try {
const user = await User.findOne({ _id: req.user.id });
if (!user) {
return res.status(404).send({ message: "User not found" });
}
const messageId = req.params.id;
user.receivedMessages = user.receivedMessages.filter(
(message) => message._id != messageId
);
user.sentMessages = user.sentMessages.filter(
(message) => message._id != messageId
);
await user.save();
res.status(200).send({ message: "Message deleted successfully" });
} catch (error) {
console.log(error);
res.status(500).send({ message: "Error deleting message" });
}
});

// Get all doctors
// get All doctors
router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});









module.exports = router ;