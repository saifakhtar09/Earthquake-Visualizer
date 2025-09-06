import React from "react";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import ErrorBoundary from "../components/ErrorBoundary";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ErrorBoundary>
        {/* Navbar stays fixed at top */}
        <Navbar />

        {/* Main content area */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
          {children}
        </main>
             <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default MainLayout;
