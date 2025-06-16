import React, { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';

export default function HelpAndEarn() {
  const [copied, setCopied] = useState(false);
  const referralURL = 'https://go.kodnest.com/refer-earn?code=YOUR_CODE';

  return (
    <section className="w-[95%] max-w-2xl mx-auto py-10">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        LearnoHu Refer and Earn Program
      </h2>

      {/* Referral Bonus Card */}
      <div className="mt-8 rounded-xl p-6 bg-gradient-to-r from-purple-100 to-pink-100">
        <h3 className="flex items-center text-xl font-bold mb-2">
          <span className="mr-3 text-purple-600 text-3xl">🎁</span> Referral Bonus
        </h3>
        <p className="text-lg font-semibold">Earn <span className="text-purple-700 font-bold">₹2,000</span> for every successful referral</p>
        <p className="text-lg">Your friend gets <span className="text-pink-600 font-bold">₹2,000 discount</span> on course fees</p>
        <p className="italic mt-1">No limit on referrals – earn unlimited rewards!</p>
      </div>

      {/* Instructions */}
      <div className="mt-6 border rounded-xl p-6 bg-gray-50">
        <h4 className="font-semibold text-lg mb-3">Important Instructions</h4>
        <p className="mb-4">Ask your friends to mention your name and KodNest&nbsp;ID when filling out the registration form.</p>

        <div className="flex items-center">
          <input
            readOnly
            value={referralURL}
            className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm overflow-x-auto"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(referralURL);
              setCopied(true); setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center px-4 py-2 rounded-r-md bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaRegCopy className="mr-2" /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          href={referralURL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600
                     text-white font-semibold hover:opacity-90"
        >
          Start Referring Now
        </a>
      </div>
    </section>
  );
}
