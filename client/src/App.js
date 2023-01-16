import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Button } from "antd";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import ApplyPatient from "./pages/ApplyPatient";
import Notifications from "./pages/Notifications";
import Patient from "./pages/Patient";
import Pharmacy from "./pages/Pharmacy";
import PatientsList from "./pages/Admin/PatientsList";
import Userslist from "./pages/Admin/Userslist";
import DoctorsList from "./pages/Admin/DoctorsList";
import Profile from "./pages/Doctor/Profile";
import PatientProfile from "./pages/Patient/PatientProfile";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import Services from "./pages/Services";
import CriticalCare from "./pages/Critical Care";
import ErrorBoundary from './pages/ErrorBoundary';
import Messaging from "./components/Messages";




// import Banner from "../components/Banner";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
          
              <Login />
            </PublicRoute>
          }
        />

<Route
          path="/services"
          element={
            <PublicRoute>
          
              <Services/>
            
            </PublicRoute>
          }
        />



<Route
          path="/critical-medicine"
          element={
            <PublicRoute>

<CriticalCare/>


          
            
            
            </PublicRoute>
          }
        />












        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
{/* ////// */}
<Route
          path="/labs"
          element={
            <ProtectedRoute>
         
              <Patient />
            </ProtectedRoute>
          }
        />
<Route
          path="/pharmacy"
          element={
            <ProtectedRoute>
         
              <Pharmacy />
            </ProtectedRoute>
          }
        />





        {/* ////////////////////////// */}
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
<Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messaging/>
            </ProtectedRoute>
          }
        />












        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
        />
   <Route
          path="/apply-patient"
          element={
            <ProtectedRoute>
              <ApplyPatient />
            </ProtectedRoute>
          }
        />



        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/userslist"
          element={
            <ProtectedRoute>
              <Userslist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctorslist"
          element={
            <ProtectedRoute>
              <DoctorsList />
            </ProtectedRoute>
          }
        />






               <Route
          path="/admin/patientslist"
          element={
            <ProtectedRoute>
              <PatientsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

<Route
          path="/patient/profile/:userId"
          element={
            <ProtectedRoute>
              <PatientProfile />
            </ProtectedRoute>
          }
        />




<Route
          path="/user/profile/:userId"
          element={
            <ProtectedRoute>
              <PatientProfile />
            </ProtectedRoute>
          }
        />






        <Route
          path="/book-appointment/:doctorId"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
