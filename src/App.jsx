import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Chart from "./components/Chart";
import MainLayout from "./layouts/MainLayout";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
