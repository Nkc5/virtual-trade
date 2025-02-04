import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword'; // Import ForgotPassword
import SuperAdminDashboard from './components/Dashboard/SuperAdminDashboard';
import VendorDashboard from './components/Dashboard/VendorDashboard';
import EventLandingPage from './pages/EventLandingPage';
import Auditorium from './pages/Auditorium';
import ExhibitionHall from './pages/ExhibitionHall';
import InfoDesk from './pages/InfoDesk';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer'; // Import Footer
import EventForm from './components/Event/EventForm'; // Import EventForm
import VendorForm from './components/Vendor/VendorForm'; // Import VendorForm
import RoomDetails from './components/Room/RoomDetails'; // Import RoomDetails

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add route for forgot password */}

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events/create" element={<EventForm />} /> {/* Route for creating events */}
          <Route path="/events/:eventId/edit" element={<EventForm />} /> {/* Route for editing events */}
          <Route path="/vendors/create" element={<VendorForm />} /> {/* Route for creating vendors */}
          <Route path="/events/:eventId" element={<EventLandingPage />} />
          <Route path="/auditorium/:roomId" element={<RoomDetails />} /> {/* Route for RoomDetails */}
          <Route path="/exhibition-hall/:eventId" element={<ExhibitionHall />} />
          <Route path="/info-desk" element={<InfoDesk />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} /> {/* Catch-all route */}

      </Routes>
      <Footer /> {/* Include the Footer */}
    </Router>
  );
};

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children || <Outlet/> : <Navigate to="/login" />;
};

const Dashboard = () => {
  const userRole = localStorage.getItem('userRole');

  if (userRole === 'SuperAdmin') {
    return <SuperAdminDashboard />;
  } else if (userRole === 'Vendor') {
    return <VendorDashboard />;
  } else {
    return <div>You do not have access to the dashboard.</div>; // Or redirect
  }
};

export default App;