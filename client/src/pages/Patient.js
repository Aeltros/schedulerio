import Labs from "../components/Labs";
import React from 'react'
import { Button, Form, Input } from "antd";
import Layout from "../components/Layout";

import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, UNSAFE_RouteContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Patient() {

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
  <div>This is the first admission for this 56 year old woman, Convey the acute or chronic nature of the problem and
who states she was in her usual state of good health until establish a chronology.
one week prior to admission. At that time she noticed the
abrupt onset (over a few seconds to a minute) of chest pain onset
which she describes as dull and aching in character. The character
pain began in the left para-sternal area and radiated up to location
her neck. The first episode of pain one week ago occurred radiation
when she was working in her garden in the middle of the circumstances; exacerbating factors
day. She states she had been working for approximately 45
minutes and began to feel tired before the onset of the pain.
Her discomfort was accompanied by shortness of breath, but associated symptoms
no sweating, nausea, or vomiting. The pain lasted
approximately 5 to 10 minutes and resolved when she went duration
inside and rested in a cool area.
  </div>

  <table class="table table-bordered table-sm table-responsive">
      <thead>
        <tr>
          <th scope="col">Parameter</th>
          <th scope="col"> Current Value</th>
          <th scope="col">Previous value</th>
          <th scope="col">Remarks</th>
          <th scope="col">Verified by</th>
          <th scope="col">Date/time</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr>
          <th scope="row">Haemoglobin</th>
          <td>8.5 mg/dl</td>
          <td>9 mg/dl</td>
          <td>with in range </td>
          <td>${user.name},CLS</td>

          <td> {currentTime}</td>
        </tr>
        <tr>
        <th scope="row">Haematocrit</th>
        <td>27 mg/dl</td>
        <td>27 mg/dl</td>
        <td>with in range </td>
        <td>Micheal Bolton,CLS</td>
        <td>verified at date()</td>
      </tr>

      <tr>
      <th scope="row">RBC Count</th>
      <td> 4.6</td>
      <td>4.8</td>
      <td>with in range </td>
      <td>Micheal Bolton,CLS</td>
      <td>verified at date()</td>
    </tr>
    <tr>
  <th scope="row">PCV</th>
  <td> 37.8</td>
  <td>36.9</td>
  <td>with in range </td>
  <td>Micheal Bolton,CLS</td>
  <td>verified at date()</td>
</tr>
<tr>
<th scope="row">RBC INDICES</th>
</tr>

<tr>
<th scope="row">PCV</th>
<td> 37.8</td>
<td>36.9</td>
<td>with in range </td>
<td>Micheal Bolton,CLS</td>
<td>verified at date()</td>
</tr>

<tr>
<th scope="row">MCV</th>
<td> 83</td>
<td>80</td>
<td>with in range </td>
<td>Micheal Bolton,CLS</td>
<td>verified at date()</td>
</tr>
<tr>
<th scope="row">MCH</th>
<td> 33.7</td>
<td>36.3</td>
<td>with in range </td>
<td>Micheal Bolton,CLS</td>
<td>verified at date()</td>
</tr>
<tr>
<th scope="row">RDW</th>
<td> 10</td>
<td>10.3</td>
<td>with in range </td>
<td>Micheal Bolton,CLS</td>
<td>verified at date()</td>
</tr>
<tr>
<th scope="row">WBC </th>
</tr>
<tr>
<th scope="row">WBC</th>
<td> 5500</td>
<td>5300</td>
<td>with in range </td>
<td>Micheal Bolton,CLS</td>
<td>verified at date()</td>
</tr>





<tr>
<th scope="row">Neutrophils</th>
<td> 60</td>
<td>64</td>
<td>with in range </td>
<td>Micheal Bolton,CLS</td>
<td>verified at date()</td>
</tr>

<tr>
<th scope="row">Lymphocytes</th>
<td> 30</td>
<td>30</td>
<td>with in range </td>
<td>Micheal Bolton,CLS</td>
<td>verified at date()</td>
</tr>
<tr>
<th scope="row">Eosinophils</th>
<td> 5</td>
<td>5</td>
<td>with in range </td>
<td>Micheal Bolton,CLS</td>
<td>verified at date()</td>
</tr>
<tr>
<th scope="row">Monocytes</th>
<td> 5</td>
<td>5</td>
<td>with in range </td>
<td>Micheal Bolton,CLS</td>
<td>verified at date()</td>
</tr>
<tr>
<th scope="row">Platelets</th>
</tr>
<tr>
<th scope="row">platelet Count</th>
<td> 43K</td>  
<td>5</td>
<td>thrombocytopenia </td>
<td> Sent for Path.Review Micheal Bolton,CLS</td>
<td>verified at date()</td>
</tr>









      
      
      </tbody>
    </table>


























  
  </div>
  <div class="row">
  <h3>Next gen Clinical Laboratory</h3>
  <h3>CLIA ID: {user._id}</h3>
  <h4>Carl Sagan, MD <span>Medical Director</span></h4>
  <h3>Result Verified by <strong>{user.name}, Laboratory Scientist<span> on</span>  {Date()}   </strong></h3>
  </div>
  <div class="row">Biology</div>
  <div class="row">Blood Bank</div>
</div>
    </div>


</Labs>














  
    </>
  )
}

export default Patient