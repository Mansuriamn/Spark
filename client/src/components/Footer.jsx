import React from 'react';
import { FaYoutube, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto flex  sm: justify-between gap-8">
        {/* Logo & Description */}
        <div className="w-full sm:w-1/4 mb-10 text-center sm:text-left">
          <h4 className="text-lg font-bold mb-2 text-white">EduPress</h4>
          <p className="text-purple-100">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore.
          </p>
        </div>

        {/* Get Help */}
        <div className="w-full sm:w-1/4 mb-10 font-semibold text-center sm:text-left">
          <h4 className="font-bold mb-2 text-white">Get Help</h4>
          <ul className="space-y-1 text-purple-100">
            <li><a href="#" className="hover:text-orange-400">Contact Us</a></li>
            <li><a href="#" className="hover:text-orange-400">Latest Articles</a></li>
            <li><a href="#" className="hover:text-orange-400">FAQ</a></li>
          </ul>
        </div>

        {/* Programs */}
        <div className="w-full sm:w-1/4 mb-10 font-semibold text-center sm:text-left">
          <h4 className="font-bold mb-2 text-white">Programs</h4>
          <ul className="space-y-1 text-purple-100">
            <li><a href="#" className="hover:text-orange-400">Art & Design</a></li>
            <li><a href="#" className="text-orange-400 font-semibold hover:text-orange-500">Business</a></li>
            <li><a href="#" className="hover:text-orange-400">IT & Software</a></li>
            <li><a href="#" className="hover:text-orange-400">Languages</a></li>
            <li><a href="#" className="hover:text-orange-400">Programming</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="w-full sm:w-1/4 mb-10 font-semibold text-center sm:text-left">
          <h4 className="font-bold mb-2 text-white">Contact Us</h4>
          <p className="text-purple-100">2321 New Design Str, Lorem Ipsum10, Hudson Yards, USA</p>
          <p className="text-purple-100">Tel: + (123) 2500-567-898</p>
          <p className="text-purple-100">Mail: supportlms@gmail.com</p>
          <div className="mt-4 flex justify-center sm:justify-start items-center space-x-6 text-2xl text-white">
            <a href="#" aria-label="YouTube" className="hover:text-orange-400"><FaYoutube /></a>
            <a href="#" aria-label="Facebook" className="hover:text-orange-400"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter/X" className="hover:text-orange-400"><FaXTwitter /></a>
          </div>
        </div>
      </div>

      {/* Divider and Bottom Note */}
      <hr className="my-6 border-purple-300" />
      <p className="text-center text-purple-200 text-sm">
        Copyright © 2025 LearnPress LMS | Powered by <span className="font-bold text-white">Pragati</span>
      </p>
    </footer>
  );
};

export default Footer;

