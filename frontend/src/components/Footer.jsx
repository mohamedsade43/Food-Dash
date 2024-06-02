import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-300 py-8 mt-16">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <FaInstagram />
          </a>
        </div>
        <p className="mb-4">&copy; 2024 All rights reserved</p>
        <p className="text-sm">
          <a href="/privacy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>{" "}
          |
          <a href="/terms" className="text-gray-400 hover:text-white ml-2">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
