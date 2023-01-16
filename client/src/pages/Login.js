import { Button, Form, Input } from "antd";
 import LayoutServ from "../components/LayoutServ";
import React from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import HospitalFooter from "../components/HospitalFooter";
import HospitalHeader from "../components/HospitalHeader";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        // save back end data (token //like a session)
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong during login");
    }
  };


  const onMouseOver = (event) => {
    event.target.style.color = 'purple';
}

const onMouseOut = (event) => {
    event.target.style.color = 'blue';
}


  
  


  return (

    <LayoutServ>
    <div className="header-container" >
    </div>
    <div className="authentication">
      <div className="authentication-form card p-3">
        {/* <h1 className="card-title">Welcome Back</h1> */}

        {/* <form onSubmit={onFinish}>

        <label style={{fontWeight: "bold", color: "black"}}>Email: <input type="text" name="email" placeholder="Email" style={{padding: "5px", margin: "5px"}} onMouseOver={onMouseOver} onMouseOut={onMouseOut}/></label>
  <br/>
  <label style={{fontWeight: "bold", color: "black"}}>Password: <input type="password" name="password" placeholder="Password" style={{padding: "5px", margin: "5px"}} onMouseOver={onMouseOver} onMouseOut={onMouseOut}/></label>
  <br/><br/>
  <input type="submit" value="LOGIN" style={{backgroundColor: "green", color: "white", padding: "10px", borderRadius: "5px"}} onMouseOver={onMouseOver} onMouseOut={onMouseOut}/>
  <br/>
  <Link to="/register" style={{textDecoration: "none", color: "blue"}} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>CLICK HERE TO REGISTER</Link>




</form> */}

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button className="primary-button my-2 full-width-button" htmlType="submit">
            LOGIN
          </Button>

          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO REGISTER
          </Link>
         
        </Form>




      </div>
    </div>
<div>  
</div>


<HospitalFooter/>
</LayoutServ>
  );
}

export default Login;