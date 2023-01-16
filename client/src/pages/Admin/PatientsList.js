import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import LayoutServ from "../../components/LayoutServ";

function PatientsList() {
  const [patients, setPatients] = useState([]);
  const dispatch = useDispatch();
  const getPatientsData = async () => {
    try {dispatch(showLoading());
  const response = await axios.get("/api/admin/get-all-patients", { headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,},});
      dispatch(hideLoading());
      if (response.data.success) {setPatients(response.data.data);}} catch (error) {dispatch(hideLoading());}
  };

  const changePatientStatus = async (record, status) => {try {dispatch(showLoading());
      const response = await axios.post("/api/admin/change-patient-account-status",
        { patientId: record._id, userId: record.userId, status: status },
        { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,},});
      dispatch(hideLoading());
      if (response.data.success) { toast.success(response.data.message);getPatientsData();}} catch (error) {
      toast.error('Error approving Patient admission');dispatch(hideLoading());}};
  useEffect(() => {getPatientsData();}, []);


  const columns = [
    {title: "Patient Name", dataIndex: "name",render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>),},

    {title: "Phone#",dataIndex: "phoneNumber",},
    {title: "Created At",dataIndex: "createdAt",render: (text , record) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {title: " Account status",dataIndex: "status",},
    {title: "Approval Actions",dataIndex: "actions",render: (text, record) => (<div className="d-flex">
          {record.status === "pending" && (
            <h1
              className="anchor"
              onClick={() => changePatientStatus(record, "approved")}
            >
              Approve Credentials
            </h1>)}
          {record.status === "approved"  && (
            <h1
              className="anchor"
              onClick={() => changePatientStatus(record, "blocked")}
            >
              Restrict Access
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    // <Layout>
    //   <h1 className="page-header">Patient List</h1>
    //   <hr />
    //   <Table 
    //   columns={columns} dataSource={patients} />
    // </Layout>




<LayoutServ>


<h1 className="page-header">Patient List</h1>
      <hr />
      <Table 
      columns={columns} dataSource={patients} />



</LayoutServ>
  );
}

export default PatientsList;
