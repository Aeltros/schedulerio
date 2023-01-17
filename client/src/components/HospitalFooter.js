import React from 'react';

import { FacebookFilled, TwitterCircleFilled, YelpFilled } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const HospitalFooter = () => {
  const address = "1 Healthcare  St, San jose, CA 97621";
  const facebookLink = "https://www.facebook.com/hospitalname";
  const twitterLink = "https://twitter.com/hospitalname";
  const yelpLink = "https://www.yelp.com/hospitalname";
  const patientRating = "4.5";
  const jointCommissionRating = "3.5";
  const CDClink = "https://www.cdc.gov/coronavirus/2019-ncov/index.html";
  const JointCommissionLink = "https://www.jointcommission.org/";
  
  return (
    <div className="footer">
      <div className="address">
        <h4>Address:</h4>
        <p>{address}</p>
      </div>
      <div className="social-media">
        <h4>Follow us on:</h4>


         <a href={facebookLink}> <FacebookFilled size={30}/></a>
        <a href={twitterLink}> <TwitterCircleFilled size={30}/></a>
        <a href={yelpLink}> <YelpFilled size={30}/></a>
      </div>
      <div className="rating">
        <h4>Patient Rating:</h4>
        <p>{patientRating}/5</p>
        <h4>Joint Commission Rating:</h4>
        <p>{jointCommissionRating}/5</p>
      </div>
      <div className="footer-banner">
        <a href={CDClink}>CDC</a>
        <a href={JointCommissionLink}>Joint Commission</a>
      </div>
      
    </div>
  );
}

export default HospitalFooter;
