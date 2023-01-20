import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHeart, faUserMd, faHospital,  faClock, faPills, faArrowCircleRight,faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import "../LayoutServ.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { faHome, faSignInAlt,  faLive,faWheelchair, faPersonHiking } from '@fortawesome/free-solid-svg-icons';
import { Badge } from "antd";
import BackgroundAnimation from "../pages/BackgroundAnimation";

import HospitalHeader from "./HospitalHeader";

library.add(faUser, faHeart, faUserMd, faHospital,  faClock, faPills,  faPersonHiking,faSignInAlt,  faWheelchair,faArrowCircleRight);

function LayoutServ({ children }) {

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();


  const date = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const currentDate = date.toLocaleDateString('en-US', options);
let hours = date.getHours();
let time = (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ":" + date.getMinutes() + ":" + date.getSeconds();



  let Greetings = "Hello" + (user ? ` ${user.name},` : ",") + " today is " + currentDate + " and the time is ";
  Greetings = Greetings + " " + time;
  
  if (user) {
    if (user.isAdmin) {
      Greetings = "Welcome back, Admin " + user.name + ". Today is " + currentDate + " and the time is " + time;
    } else if (user.isDoctor) {
      Greetings = "Good " + (hours < 12 ? "morning" : hours < 18 ? "afternoon" : "evening") + ", Dr. " + user.name + ". Today is " + currentDate + " and the time is " + time;
    } else if (user.isPatient) {
      Greetings = "Good " + (hours < 12 ? "morning" : hours < 18 ? "afternoon" : "evening") + ", Dear Patient " + user.name + ". Today is " + currentDate + " and the time is " + time;
    } else {
      Greetings = "Hello " + user.name + ", today is " + currentDate + " and the time is " + time;
    }
  } else {
    Greetings = "Welcome, today is " + currentDate + " and the time is " + time;
  }
  




  const nonUserMenu = [
    {
      name: "Home",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      name: "Services",
      path: "/services",
      icon: <FontAwesomeIcon icon={faArrowCircleRight} />,
    },
    {
      name: "Contact Us",
      path: "/contact-us",
      icon: <FontAwesomeIcon icon={faEnvelopeOpen } />,
   
    },
  ];



  const [selectedService, setSelectedService] = useState(null);
  const services = [
   {
     name: "General check-up",
     subServices: ["Physical examination", "Medical history review", "Vital signs measurement"]
   },
   {
     name: "Dental cleaning",
     subServices: ["Teeth cleaning", "Gum examination", "Fluoride treatment"]
   },
   {
     name: "Vaccinations",
     subServices: ["Flu vaccine", "Tetanus shot", "Measles vaccine"]
   },
   {
     name: "Imaging",
     subServices: ["X-ray", "CT scan", "MRI"]
   },
   {
     name: "Laboratory",
     subServices: ["Blood work", "Urine analysis", "Microbiology culture"]
   },
   {
     name: "Urgent Care",
     subServices: ["Injury treatment", "Illness diagnosis", "Emergency surgery"]
   },
   {
     name: "TeleMedicine",
     subServices: ["Virtual consultations", "Online prescriptions", "Remote monitoring"]
   },
   {
     name: "Pharmacy",
     subServices: ["Medication dispensing", "Prescription refills", "Medication counseling"]
   },
 ];
 
 
 const handleClick = (service) => {
   setSelectedService(service);
 }














  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
      key: 1,
    },
 
    {
      name: "Apply for Provider Position",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Apply for Admission",
      path: "/apply-patient",
      icon: "ri-hospital-line",
      key: 2,
    },
    {
      name: "Messages",
      path: "/messages",
      icon:<FontAwesomeIcon icon="envelope" size="lg" color="blue" /> ,
      key: 3,
    },


    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
      key: 6,
    },

  
  ];

  const patientMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
      key: 4,
    },
     {
      name: "Profile",
      path: `/patient/profile/${user?._id}`,
      icon: "ri-hospital-line",
      key: 5,
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
      key: 6,
    },

    {
      name: "Labs",
      path: "/labs",
      icon: "ri-file-list-line",
      key: 7,

    },
    {
      name: "Pharmacy",
      path: "/Pharmacy",
      icon: "ri-gitlab-line",
      key: 8,
    },
   

    {
      name: "TeleMed",
      path: "/patient/labs",
      icon: "ri-live-line",
      key: 9,
    },
   {
      name: "Contact Us",
      path: "#",
      icon: <FontAwesomeIcon icon={faEnvelopeOpen } />,
      key: 10,
    },


    {
      name: "Messages",
      path: "/messages",
      icon:<FontAwesomeIcon icon="envelope" size="lg" color="blue" /> ,
      key: 11,
    }
    ,
  ];


  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
      key: 12,
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "PhysicianProfile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
      key: 13,
    },

    {
      name: "Messages",
      path: "/messages",
      icon:<FontAwesomeIcon icon="envelope" size="lg" color="blue" /> ,
      key: 14,

    }
    ,



  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
      key: 16,
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
      key: 17,
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
      key: 18,
    },
    {
      name: "Patients",
      path: "/admin/patientslist",
      icon: "ri-user-star-line",
      key: 18,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
       key: 20,
    },


    {
      name: "Messages",
      path: "/messages",
      icon:<FontAwesomeIcon icon="envelope" size="lg" color="blue" /> ,
      key: 21,
    }
    
    ,
  ];


 

    const menuToBeRendered = user ? (user.isPatient ? patientMenu : user.isAdmin ? adminMenu : user.isDoctor ? doctorMenu : userMenu) : nonUserMenu;
    const role = user ? (user.isAdmin ? "Admin" : user.isDoctor ? "Doctor" : user.isPatient ? "Dear Patient" : "User") : "Non-user";
    const title = user ? (user.isDoctor ? "Dr." : "Mr/Ms.") : "";



  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
          <h5 className="logo">Ecorp Health Care</h5>
<h5 style={{backgroundColor: 'black', position: 'relative'}}>
        <BackgroundAnimation
             style={{position: 'absolute', top:0, left: 0, width: '10px', height: '10px'}}
        />
        <p style={{color: 'red', position: 'absolute', top: '20px', left: '20px'}}>Hello</p>
    </h5>

             {Greetings} 


<div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
               <Link to="/login">Logout</Link>
            </div>




</div>


          </div>
          {menuToBeRendered.map((menu, index) => {
  const isActive = location.pathname === menu.path;
  return (
    <div
      key={index}
      className={`d-flex menu-item ${isActive && "active-menu-item"}`}
    >
      <i className={menu.icon}></i>
      <Link to={menu.path}>{menu.name}</Link>
    </div>
  );
})}
        </div>
        <div className="content">
        <HospitalHeader/> 
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default LayoutServ;