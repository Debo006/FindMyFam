import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPageFMF from "./pages/MainPageFMF";
import Login from "./pages/Login";
import RegisterForm from "./pages/RegisterForm";
import AllMembers from "./pages/AllMembers";
import QRScanner from "./pages/QRScanner";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPageFMF />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/members"
          element={
            <PrivateRoute>
              <AllMembers />
            </PrivateRoute>
          }
        />
        <Route
          path="/scan"
          element={
            <PrivateRoute>
              <QRScanner />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
