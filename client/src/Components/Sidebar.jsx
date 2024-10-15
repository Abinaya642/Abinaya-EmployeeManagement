import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-gray-100 text-gray-500 flex flex-col">
      <div className="flex-1 mt-6">
        <ul>
          <li className="flex items-center p-4 hover:bg-blue-600 hover:text-white cursor-pointer hover:rounded-r-full mr-7 ml-2">
            <FaTachometerAlt className="mr-3" />
            <span>Dashboard</span>
          </li>
          <Link to={'/'}><li className="flex items-center p-4 hover:bg-blue-600 hover:text-white cursor-pointer hover:rounded-r-full mr-7 ml-2">
            <FaUsers className="mr-3" />
            <span>Employees</span>
          </li></Link>
          <li className="flex items-center p-4 hover:bg-blue-600 hover:text-white cursor-pointer hover:rounded-r-full mr-7 ml-2">
            <FaCalendarAlt className="mr-3" />
            <span>Calendar</span>
          </li>
          <li className="flex items-center p-4 hover:bg-blue-600 hover:text-white cursor-pointer hover:rounded-r-full mr-7 ml-2">
            <FaEnvelope className="mr-3" />
            <span>Messages</span>
          </li>
        </ul>
      </div>
    </div>

  );
};

export default Sidebar;
