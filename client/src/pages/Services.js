import React from 'react';
import  { useState } from "react";
import Layout from '../components/Layout';
import BackgroundAnimation from './BackgroundAnimation';
import { Link, useNavigate } from "react-router-dom";
import './services.css';
import LayoutServ from '../components/LayoutServ';


function Services() {
 


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




    
  return (


<>

<LayoutServ>
      <div className="services-container">
        <h1 className="page-header">Our Services</h1>
        <hr />
        <ul className="services-list">
          {services.map((service, index) => (
            <li key={index} className="services-item" onClick={() => handleClick(service)}>{service.name}</li>
          ))}
        </ul>
        {selectedService && (
          <div className="sub-services-container">
            <h2 className="sub-services-header">{selectedService.name}</h2>
            <hr />
            <ul className="sub-services-list">
              {selectedService.subServices.map((subService, index) => (
               
                <li key={index} className="sub-services-item">{subService}</li>
              ))}
            </ul>
            <Link to="/register" className="anchor mt-2">
            Register for our services
          </Link>
          </div>
        )}
      </div>
    </LayoutServ>


</>


  )
}

export default Services;
