import React, { useState } from "react";
import "../LayoutServ.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
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
    }
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
  const nonUserMenu = [
    {
    name: "Home",
    path: "/",
    icon: "ri-home-line",
    },
    {
    name: "Services",
    path: "/services",
    icon: "ri-file-list-line",
    },
    // {
    // name: "Laboratory Imaging",
    // path: "/laboratory-imaging",
    // icon: "ri-gitlab-line",
    // },
    // {
    // name: "Pharmacy",
    // path: "/pharmacy",
    // icon: "ri-gitlab-line",
    // },
    {
    name: "Critical Medicine",
    path: "/critical-medicine",
    icon: "ri-live-line",
    },
    {
    name: "Contact Us",
    path: "/contact-us",
    icon: "ri-user-line",
    },
    {
    name: "Hours of Operation",
    path: "/hours-of-operation",
    icon: "ri-user-line",
    }
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
        name: "Patients",
        path: "/admin/patientslist",
        icon: "ri-user-star-line",
      },
      {
        name: "Profile",
        path: "/profile",
        icon: "ri-user-line",
      },
    ];


















  const patientMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
     {
      name: "patientProfile",
      path: `/patient/profile/${user?._id}`,
      icon: "ri-hospital-line",
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
    // {
    //   name: "Radiology",
    //   path: "/radiology",
    //   icon: "ri-gitlab-line",
    // },

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
    // {
    //   name: "Profile",
    //   path: `/patient/profile/${user?._id}`,
    //   icon: "ri-user-line",
    // },
  ];

  // const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  // const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";


  const menuToBeRendered = user ? (user.isPatient ? patientMenu : user.isAdmin ? adminMenu : user.isDoctor ? doctorMenu : userMenu) : nonUserMenu;
  const role = user ? (user.isAdmin ? "Admin" : user.isDoctor ? "Doctor" : user.isPatient ? "Dear Patient" : "User") : "Non-user";
  const title = user ? (user.isDoctor ? "Dr." : "Mr/Ms.") : "";




















  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">SH</h1>
            <h1 className="role">{role}</h1>
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
              <i className="ri-logout-circle-line"></i>
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

            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-2" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
