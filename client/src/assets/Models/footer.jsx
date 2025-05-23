import React from 'react';
import { FaInstagramSquare, FaFacebookF } from "react-icons/fa";
import { FaYoutube, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-100 px-6 py-12 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between">
        
        <div className="sm:w-1/4 mb-10 font-semibold">
          <h4 className="font-bold text-lg mb-2">EduPress</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore.
          </p>
        </div>

        <div className="w-full sm:w-1/4 mb-10 font-semibold">
          <h4 className="font-bold mb-2">Get Help</h4>
          <ul className="space-y-1">
            <li>Contact Us</li>
            <li>Latest Articles</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="w-full sm:w-1/4 mb-10 font-semibold">
          <h4 className="font-bold mb-2">Programs</h4>
          <ul className="space-y-1">
            <li>Art & Design</li>
            <li className="text-orange-500 font-semibold">Business</li>
            <li>IT & Software</li>
            <li>Languages</li>
            <li>Programming</li>
          </ul>
        </div>

  
        <div className="w-full sm:w-1/4 mb-10 font-semibold">
          <h4 className="font-bold mb-2">Contact Us</h4>
          <p>2321 New Design Str, Lorem Ipsum10, Hudson Yards, USA</p>
          <p>Tel: + (123) 2500-567-898</p>
          <p>Mail: supportlms@gmail.com</p>
          <div className="mt-4 flex items-center space-x-4 text-2xl">
            <a href="#" aria-label="Instagram" className="hover:text-orange-500"><FaInstagramSquare /></a>
            <a href="#" aria-label="YouTube" className="hover:text-orange-500"><FaYoutube /></a>
            <a href="#" aria-label="Facebook" className="hover:text-orange-500"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter/X" className="hover:text-orange-500"><FaXTwitter /></a>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-300" />
      <p className="text-center text-gray-500">Copyright © 2025 LearnPress LMS | Powered by Praagti</p>
    </footer>
  );
};

export default Footer;
