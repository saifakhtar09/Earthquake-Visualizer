import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Activity, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <Activity className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Earthquake Visualizer
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500">
                Real-time seismic activity monitoring
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/chart"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Chart
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
          </div>

          {/* Data Source Info (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
            <span>Data from</span>
            <a
              href="https://earthquake.usgs.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              USGS
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2 border-t border-gray-200">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/chart"
            className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Chart
          </Link>
          <Link
            to="/about"
            className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
