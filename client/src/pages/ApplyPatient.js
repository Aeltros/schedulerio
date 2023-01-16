import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PatientForm from "../components/PatientForm";
import moment from "moment";
import LayoutServ from "../components/LayoutServ";


function ApplyPatient() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-patient-account",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong in Admissions network");
    }
  };

  return (

    <div>
    <LayoutServ>
      <h1 className="page-title">Apply Patient</h1>
      <hr />

      <PatientForm onFinish={onFinish} />
    </LayoutServ>

    </div>

  );
}

export default ApplyPatient;







































































// function ApplyPatient() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const onFinish = async (values) => {
//     try {
//       dispatch(showLoading());
//       const response = await axios.post(
//         "/api/user/apply-patient-account",
//         {
//           ...values,
//           userId: user._id,
//           timings: [
//             moment(values.timings[0]).format("HH:mm"),
//             moment(values.timings[1]).format("HH:mm"),
//           ],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (response.data.success) {
//         toast.success(response.data.message);
//         navigate("/");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       dispatch(hideLoading());
//       toast.error("Something went wrong in Apply patient .js");
//     }
//   };

//   return (
//     <Layout>
//       <h1 className="page-title">Patient Information</h1>
//       <hr />

//       <PatientForm onFinish={onFinish} />
//     </Layout>
//   );
// }

// export default ApplyPatient;
