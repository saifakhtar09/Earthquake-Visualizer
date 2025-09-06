// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo and Description */}
        <div>
          <h2 className="text-xl font-bold text-white">Earthquake Visualizer</h2>
          <p className="mt-2 text-gray-400">
            Visualize earthquake data in real-time with interactive maps and detailed charts. Stay informed, stay safe.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul>
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p>Email: support@earthquakevisualizer.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-white">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-500 mt-8 border-t border-gray-800 pt-4">
        &copy; {new Date().getFullYear()} Earthquake Visualizer. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
