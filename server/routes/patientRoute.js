const express = require("express");
const router = express.Router();
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
//const { default: userProfile } = require("../../client/src/pages/userProfile");

router.post("/get-patient-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Patient  info fetched successfully",
      data: patient,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting patient info", success: false, error });
  }
});



// get one by id
router.post("/get-patient-info-by-id", authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.body.patientId });
    res.status(200).send({success: true,
      message: "patient info fetched successfully",data: patientProfile,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting patientProfile info", success: false, error });
  }
});
// update one
router.post("/update-patient-profile", authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "patientProfile  updated successfully",
      data: patient,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting patient info", success: false, error });
  }
});


// ===========================================================================
router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    //pushing notification to doctor based on his userid
    // find one by ID PATIENT
    const patient = await Patient.findOne({ _id: req.body.doctorInfo.patientId});

    Patient.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${req.body.patientInfo.name}`,
      // 
      onClickPath: "/patient/appointments",
    });
    await Patient.save();
    res.status(200).send({message: "Patient Appointment booked successfully", success: true,});
  } catch (error) {
    console.log(error);res.status(500).send({message: "Error booking appointment",success: false,error,
    });
  }
});



router.post("/check-booking-avilability", authMiddleware, async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await Appointment.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointments available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
});

router.get("/get-appointments-by-user-id", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.body.userId });
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
});

router.post("/send-message", authMiddleware, async (req, res) => {
  try {
    // Find the recipient by email
    const recipient = await User.findOne({ email: req.body.recipientEmail });
    // Create the message object
    const message = {
      senderId: req.user._id,
      senderName: req.user.name,
      recipientId: recipient._id,
      recipientName: recipient.name,
      subject: req.body.subject,
      body: req.body.body,
    };
    // Add the message to the recipient's received messages
    recipient.receivedMessages.push(message);
    await recipient.save();
    // Add the message to the sender's sent messages
    req.user.sentMessages.push(message);
    await req.user.save();
    // Add a notification for the recipient
    recipient.unseenNotifications.push({
      type: "message-received",
      message: `You have received a message from ${req.user.name}`,
      onClickPath: "/messages/received",
    });
    await recipient.save();
    // Add a notification for the sender
    req.user.unseenNotifications.push({
      type: "message-sent",
      message: `You have sent a message to ${recipient.name}`,
      onClickPath: "/messages/sent",
    });
    await req.user.save();
    res.status(200).send({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error sending message", success: false, error });
  }
});
``



module.exports = router;


// Labs below

// router.get(
//   "/get-appointments-by-userProfile-id",
//   authMiddleware,
//   async (req, res) => {
//     try {
//       const userProfile = await userProfileModel.findOne({ userId: req.body.userId });
//       const appointments = await Appointment.find({ doctorId: doctor._id });
//       res.status(200).send({
//         message: "Appointments fetched successfully",
//         success: true,
//         data: appointments,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         message: "Error fetching appointments",
//         success: false,
//         error,
//       });
//     }
//   }
// );

// router.post("/change-appointment-status", authMiddleware, async (req, res) => {
//   try {
//     const { appointmentId, status } = req.body;
//     const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
//       status,
//     });

//     const user = await User.findOne({ _id: appointment.userId });
//     const unseenNotifications = user.unseenNotifications;
//     unseenNotifications.push({
//       type: "appointment-status-changed",
//       message: `Your appointment status has been ${status}`,
//       onClickPath: "/appointments",
//     });

//     await user.save();

//     res.status(200).send({
//       message: "Appointment status updated successfully",
//       success: true
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error changing appointment status",
//       success: false,
//       error,
//     });
//   }
// });

module.exports = router;