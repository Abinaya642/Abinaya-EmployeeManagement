import React from "react";
import {FaCog , FaBell,FaUserCircle} from  'react-icons/fa'

export const Navbar = () => {
  return (
    <div className="p-4">
      <nav className="flex justify-between items-center p-4 mb-2">
        <div className="text-blue-500 text-4xl font-semibold ">RS-TECH</div>
        <div className="flex space-x-6">
          <button className="text-gray-800 bg-gray-300 rounded-full p-2">
           <FaCog size={24}/>
          </button>
          <button className="text-gray-800 bg-gray-300 rounded-full p-2">
            <FaBell size={24}/>
          </button>
          <button className="text-gray-800 bg-gray-300 rounded-full p-2">
            <FaUserCircle size={24}/>
          </button>
        </div>
      </nav>
      <hr className="border-2 mb-2"/>
    </div>
  );
};
