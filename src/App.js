import "./assets/index.css";
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/landing";
import Memenator from "./pages/memenator";
import DApp from "./pages/dashboard";
import Comingsoon from "./pages/comingsoon";
import Dashboard from "./pages/Dashboardd/Dashboardd";
import Loader from "./pages/Loader.js";
import Ticket from "./pages/Ticket.jsx";
import Slot from "./pages/slot/page.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const previousLocation = useRef(location.pathname);

  // Paths where the loader should be shown
  const pathsWithLoader = ["/", "/dashboardd"];

  useEffect(() => {
    // Show loader only if the route is changing and is one of the specified paths
    if (
      location.pathname !== previousLocation.current &&
      pathsWithLoader.includes(location.pathname)
    ) {
      setLoading(true);
      previousLocation.current = location.pathname;

      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [location]);

  const text = 'COMING SOON';
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/memenator" element={<Memenator />} />
          <Route path="/dashboard" element={<DApp />} />
          <Route path="/dashboardd" element={<Dashboard />} />
          <Route path="/coming-soon" element={<Comingsoon text={text} />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/slot" element={<Slot />} />
          <Route path="/ticket" element={<Ticket />} />
        </Routes>
      )}
      <ToastContainer />
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
