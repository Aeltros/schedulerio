import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";
import React from "react";


function PatientForm({ onFinish, initivalValues }) {
  return (
    <Form
       layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initivalValues,
        ...(initivalValues && {
          timings: [
            moment(initivalValues?.timings[0], "HH:mm"),
            moment(initivalValues?.timings[1], "HH:mm"),
          ],
        }),  
      }}
    >
      <h3 >Basic Medical History</h3>
      <Row gutter={20}>
        <Col span={50} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="First Name"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Last Name"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Website"
            name="website"
            rules={[{ required: true }]}
          >
            <Input placeholder="Website" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-3">Professional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Experience"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Experience" type="number" />
          </Form.Item>
        </Col>


        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Fee Per Cunsultation"
            name="feePerCunsultation"
            rules={[{ required: true }]}
          >
            <Input placeholder="Fee Per Cunsultation" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Timings"
            name="timings"
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}
export default PatientForm;






















































// function PatientForm({ onFinish, initivalValues }) {
//   return (
//     <Form
//       layout="vertical"
//       onFinish={onFinish}
//       initialValues={{
//         ...initivalValues,
//         ...(initivalValues && {
//           timings: [
//             moment(initivalValues?.timings[0], "HH:mm"),
//             moment(initivalValues?.timings[1], "HH:mm"),
//           ],
//         }),  
//       }}
//     >
//       <h1 className="card-title mt-3">Personal information</h1>
//       <Row gutter={9}>
//         <Col span={8} xs={24} sm={24} lg={8}>
//           <Form.Item
//             required
//             label="First Name"
//             name="firstName"
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="First Name" />
//           </Form.Item>
//         </Col>
//         <Col span={8} xs={24} sm={24} lg={8}>
//           <Form.Item
//             required
//             label="Last Name"
//             name="lastName"
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Last Name" />
//           </Form.Item>
//         </Col>
//         <Col span={8} xs={24} sm={24} lg={8}>
//           <Form.Item
//             required
//             label="Phone Number"
//             name="phoneNumber"
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Phone Number" />
//           </Form.Item>
//         </Col>
//         <Col span={8} xs={24} sm={24} lg={8}>
//           <Form.Item
//             required
//             label="Address"
//             name="address"
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Address" />
//           </Form.Item>
//         </Col>

//         <Col span={8} xs={24} sm={24} lg={8}>
//           <Form.Item
//             required
//             label="Insurance Provider"
//             name="insurance"
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Insurance Provider" />
//           </Form.Item>
//         </Col>

//         <Col span={8} xs={24} sm={24} lg={8}>
//           <Form.Item
//             required
//             label="Primary Care Provider"
//             name="pcp"
//             rules={[{ required: false }]}
//           >
//             <Input placeholder="Primary Care Provider" />
//           </Form.Item>
//         </Col>


























//         <Col span={8} xs={24} sm={24} lg={8}>
//           <Form.Item
//             required
//             label="Chief Complaints"
//             name="smoker"
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Please type in your symptoms" />
//           </Form.Item>
//         </Col>
//       </Row>
//       <hr />
//       <h1 className="card-title mt-3">Brief Medical History</h1>
//       <Row gutter={20}>
//         <Col span={8} xs={24} sm={24} lg={8}>
//           <Form.Item
//             required
//             label="Do you have history of Allergic Reactions?"
//             name="allergies"
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Medication Allergies" />
//           </Form.Item>
//         </Col>
//         <Col span={8} xs={24} sm={24} lg={8}>
//           <Form.Item
//             required
//             label="Recent Travel History"
//             name="travel"
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Travel History"  />
//           </Form.Item>
//         </Col>

// {/* future feature */}
// {/* <Col span={8} xs={24} sm={24} lg={8}>
//           <Form.Item
//             required
//             label="Remote work"
//             name="availablity"
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Remote" type="checkbox" />
//           </Form.Item>
//         </Col> */}










//         <Col span={8} xs={24} sm={24} lg={8}>
//           <Form.Item
//             required
//             label="History of Asthma"
//             name="History of Asthma "
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="History of Asthma" type="number" />
//           </Form.Item>
//         </Col>
//         <Col span={8} xs={24} sm={24} lg={8}>
//           <Form.Item
//             required
//             label="Appointment Date/Time Picker"
//             name="timings"
//             rules={[{ required: true }]}
//           >
//             <TimePicker.RangePicker format="HH:mm" />
//           </Form.Item>
//         </Col>
//       </Row>

//       <div className="d-flex justify-content-end">
//         <Button className="primary-button" htmlType="submit">
//           SUBMIT
//         </Button>
//       </div>
//     </Form>
//   );
// }
// export default PatientForm;
