import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHeart, faUserMd, faHospital, faBell, faClock, faPills } from '@fortawesome/free-solid-svg-icons';
import "../HospitalHeader.css";
import React, { useState, useEffect } from 'react';
// import BackgroundAnimation from './BackgroundAnimation';



     library.add(faUser, faHeart, faUserMd, faHospital, faBell, faClock, faPills );
const HospitalHeader = () => {
    const [time, setTime] = useState(1800); //1800 seconds = 30 minutes
  
    useEffect(() => {
      let intervalId = setInterval(() => {
        setTime(time - 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [time]);

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






<FontAwesomeIcon icon={faBell} className="notification-icon" />

];


const handleClick = (service) => {
  setSelectedService(service);
}

  return (
    <>
    <header className="hospital-header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            {/* <a href="/login">
              <FontAwesomeIcon icon={faUser} className="header-icon" />
              Login
            </a> */}
            <a href="/labs">
              <FontAwesomeIcon icon={faHeart} className="header-icon" />
              Labs
            </a>
            <a href="/">
              <FontAwesomeIcon icon={faUserMd} className="header-icon" />
              Tele Medicine--Coming soon
            </a>
            {/* <a href="/specialists">
              <FontAwesomeIcon icon={faHospital} className="header-icon" />
              Specialists
            </a> */}
            <a href="/pharmacy">
              <FontAwesomeIcon icon={faPills} className="header-icon" />
              Pharmacy
            </a>
            <a href="/healthalerts">
              <FontAwesomeIcon icon={faBell} className="header-icon" />
              HealthAlerts
            </a>
            <a href="/waitingtime">
              <FontAwesomeIcon icon={faClock} className="header-icon" 
              />
</a>



  





              Current ER wait time 
           
              
              <a href="/healthalerts">

            </a>
       {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}
            
        




          </div>
          <div className="header-right">
            <h1></h1>
          </div>
        </div>


        
      </div>
    </header>
    </>
  );
};

export default HospitalHeader;
