import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

function userProfile() {
  // const { user } = useSelector((state) => state.user);
  // const params = useParams();
  // // const [, setDoctor] = useState(null);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const onFinish = async (values) => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.post(
  //       "/api/user/update-user-profile",
  //       {
  //         ...values,
  //         userId: user._id,
  //         timings: [
  //           moment(values.timings[0]).format("HH:mm"),
  //           moment(values.timings[1]).format("HH:mm"),
  //         ],
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       navigate("/");
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     toast.error("Something went wrong");
  //   }
  // };

  // const getDoctorData = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.post(
  //       "/api/doctor/get-doctor-info-by-user-id",
  //       {
  //         userId: params.userId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       setDoctor(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(hideLoading());
  //   }
  // };

  // useEffect(() => {
  //   getDoctorData();
  // }, []);












  return  <Layout>
  <h1 className="page-title">Appointments</h1>
  <hr />
  <Table columns={columns} dataSource={appointments} />
</Layout>
}

export default userProfile;