import React, { useState } from "react";
import Layout from "./Layout";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Lab({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();


  const date = new Date;
  let hours = date.getHours();
  let Greetings = (hours < 11)? " Good Morning" :
               ((hours <= 18 && hours >= 12 ) ? " Good Afternoon" : " Good Evening");
  let currentTime = date.getHours() -12 +":"+date.getMinutes()+":"+ date.getSeconds();






  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },


    {
      name: "userProfile",
      path: `/userProfile`,
      icon: "ri-hospital-line",
    },
    {
      name: "patientProfile",
      path: `/user/profile/${user?._id}`,
      icon: "ri-hospital-line",
    }
  ];
  const patientMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },

    {
      name: "Labs",
      path: "/labs",
      icon: "ri-file-list-line",
    },
    {
      name: "Pharmacy",
      path: "/Pharmacy",
      icon: "ri-gitlab-line",
    },
    {
      name: "Radiology",
      path: "/radiology",
      icon: "ri-gitlab-line",
    },

    {
      name: "TeleMed",
      path: "/patient/labs",
      icon: "ri-live-line",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];


  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];

  const menuToBeRendered = user?.isPatient ?patientMenu:user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
 const title= user?.isDoctor ? ` Dr` :  `  Mr/Ms$`  


 console.log(user)
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h3 className="logo">Schedular.io
            
            <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLDkeifmFN8GfHe8f2MB_3ScCkUSi96M5eHg&usqp=CAU "  />
            
            </h3>
            <h1 className="role">{role}
            </h1>
            {adminMenu ? ` ${Greetings}, please check your notifications` :' '}
            {/* {doctorMenu ? ` ${Greetings}, Go out there and save somelives` :' '}
            {userMenu ? ` ${Greetings}, do waht you love every day` :' '} */}

          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <div className="ri-logout-circle-line"></div>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">

          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center ">
              <Badge count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3">
                {/* {user?.unseenNotifications.length} */}

                </i>
              </Badge>
              
              {/* <MailOutlineIcon     count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")} > {user?.unseenNotifications.length}</MailOutlineIcon> */}

              <Link className="anchor mx-2" to="/profile">
                {/* { user?.name} */}
                 <p>   
{user ? ` ${Greetings};${title} ${user.name}` :' '}


</p>
              </Link>
            </div>
          </div>
        

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Lab;
