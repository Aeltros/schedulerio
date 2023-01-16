import Labs from "../components/Labs";
import React from 'react'
import { Button, Form, Input } from "antd";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, UNSAFE_RouteContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Pharmacy() {

    // const [collapsed, setCollapsed] = useState(false);
     const { user } = useSelector((state) => state.user);
  
    // const navigate = useNavigate();
    // const location = useLocation();
  
  
    const date = new Date;
    let hours = date.getHours();
    let Greetings = (hours < 11)? " Good Morning" :
                 ((hours <= 18 && hours >= 12 ) ? " Good Afternoon" : " Good Evening");
    let currentTime = date.getHours() -12 +":"+date.getMinutes()+":"+ date.getSeconds();
    let currentDate = new Date(currentTime)
  





  return (

    <>

<Labs>

<div>
    <div class="col">
  <div class="row bg-green">SnapShot
  <div>{user.name} has hypertension and needs a prescription for Vasotec. She will take 5 mg, twice a day. It comes in 5 mg tablets. She will need a three month supply with refills for a year. Her address is 330 East First Street, Duluth, MN 55805

  </div>

  <table class="table table-bordered table-sm table-responsive">
      <thead>
        <tr>
          <th scope="col">Patient Name</th>
          <th scope="col"> Adress</th>
          <th scope="col">Rx</th>
          <th scope="col">e-Signed by</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr>
          <th scope="row">{user.name}</th>
          <td>446 E 2nd St Sanjose,CA 89786</td>
          <td>
          <p>Vasotec  5 mg tablets</p>
          <p>T tablet p.o.B.I.D</p>
          <p>{user._id}</p>
          
          </td>
          <td>with in range </td>
          <td>${user.name},CLS</td>

          <td> {currentTime}</td>
        </tr>

 
    
 








      
      
      </tbody>
    </table>


























  
  </div>
  <div class="row">
  <h3>Next gen Pharmacy</h3>
  <h3>Pharmacy_id: {user._id}</h3>
  <h4>Carl Sagan, PharmD <span>Director</span></h4>
  <h3>Prescription filled by <strong>{user.name}, PharmD<span> on</span>  {Date()}   </strong></h3>
  </div>

</div>
    </div>


</Labs>














  
    </>
  )
}

export default Pharmacy