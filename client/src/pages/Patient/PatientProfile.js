import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PatientForm from "../../components/PatientForm";
import moment from "moment";
import LayoutServ from "../../components/LayoutServ";

function PatientProfile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [patient, setPatient] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        // "/api/doctor/update-doctor-profile",
        "/api/patient/update-patient-profile",



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
      toast.error("Something went wrong pp");
    }
  };

  const getPatientData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        // "/api/doctor/get-doctor-info-by-user-id",
        "/api/patient/get-patient-info-by-user-id",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setPatient(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);
  return (
    <LayoutServ>
      <h1 className="page-title">Patient Profile</h1>
      <hr />
      {patient && <PatientForm onFinish={onFinish} initivalValues={patient} />}
    </LayoutServ>
  );
}

export default PatientProfile;
