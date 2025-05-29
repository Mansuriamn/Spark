import React from 'react';
import { IoTimeSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { SlCalender } from "react-icons/sl";
import {Link} from "react-router-dom";

const ProgressCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-2">Progress statistics</h2>
        <p className="text-3xl font-semibold mb-2">
          64% <span className="text-sm">Total activity</span>
        </p>
        <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
          <div className="h-full bg-purple-500 rounded-full" style={{ width: '64%' }}></div>
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <Link to='/progressupdate'>
        <div className="flex flex-col items-center text-purple-600 font-semibold">
          <div className="bg-purple-100 p-2 rounded-full mb-1">
            <IoTimeSharp />
          </div>
          8 In progress
        </div>
        </Link>

        <Link to='/progressupdate'>
        <div className="flex flex-col items-center text-green-600 font-semibold">
          <div className="bg-green-100 p-2 rounded-full mb-1">
            <TiTick />
          </div>
          12 Completed
        </div>
        </Link>

        <Link to='/progressupdate'>
        <div className="flex flex-col items-center text-orange-600 font-semibold">
          <div className="bg-orange-100 p-2 rounded-full mb-1">
            <SlCalender />
          </div>
          14 Upcoming
        </div></Link>
      </div>
    </div>
  );
};

export default ProgressCard;
