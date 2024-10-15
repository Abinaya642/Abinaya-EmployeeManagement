import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Context from '../MyContext/Context'
import axios from 'axios'

export const ViewEmployee = () => {
  const { selectId, setData, data } = useContext(Context)
  console.log(selectId);
  console.log(data);

  useEffect(() => {
    axios
      .get(`https://employee-management-server-i9vw.onrender.com/employee/getById/${selectId}`)
      .then((res) => {
        setData(res.data.response);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="">
   <div className="flex items-center mb-2 cursor-pointer">
   <Link to={'/'}><span className="material-icons mr-2 text-3xl mt-1">arrow_back</span></Link>
      <h1 className="text-3xl font-bold">View Employee Details</h1>
    </div>
    <form className="bg-white p-6 border rounded shadow-md">
      <div className="mb-4">
        <label className="block mb-1" htmlFor="image">Uploaded Image</label>
        {
        (
          <img
            src={data.Image}// Use the imagePreview state for the preview
            alt="Preview"
            className="mt-2 h-32 w-32 object-cover rounded border"
          />
        )}
      </div>
  
      <div className="flex justify-between mb-4">
        <div className="w-1/2 pr-2">
          <label className="block mb-1 text-gray-500" htmlFor="name">Employee Name</label>
          <span className=" p-2 mb-2 text-black">      {data.EmployeeName}</span>
        </div>
        <div className="w-1/2 pl-2">
          <label className="block mb-1 text-gray-500" htmlFor="employeeId">Employee ID</label>
          <span className=" p-2 mb-2 text-black">      {data.EmployeeID}</span>
        </div>
      </div>
      <hr className='border-1 border-gray-400 mb-3'/>
  
      <div className="flex justify-between mb-4">
        <div className="w-1/2 pr-2">
          <label className="block mb-1 text-gray-500" htmlFor="department">Department</label>
          <span className=" p-2 mb-2 text-black">
            {data.Department}
            </span>
        </div>
        <div className="w-1/2 pl-2">
          <label className="block mb-1 text-gray-500" htmlFor="designation">Designation</label>
          <span className=" p-2 mb-2 text-black">      {data.Designation}</span>
        </div>
      </div>
      <hr className='border-1 border-gray-400 mb-3'/>

  
      <div className="flex justify-between mb-4">
        <div className="w-1/2 pr-2">
          <label className="block mb-1 text-gray-500" htmlFor="project">Project</label>
          <span className=" p-2 mb-2 text-black">      {data.Project}</span>
        </div>
        <div className="w-1/2 pl-2">
          <label className="block mb-1 text-gray-500" htmlFor="type">Type</label>
          <span className=" p-2 mb-2 text-black">      {data.Type}</span>
        </div>
      </div>
      <hr className='border-1 border-gray-400 mb-3'/>

      <div className="flex justify-between mb-4">
        <div className="w-1/2 pr-2">
          <label className="block mb-1 text-gray-500" htmlFor="status">Status</label>
          <span className="mb-2 p-2 text-black">      {data.Status}</span>
        </div>
      </div>
    </form>
  </div>
  )
}
