import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const AddEmployee = () => {
  const navigate = useNavigate()
  const [employeeData, setEmployeeData] = useState({
    EmployeeName: "",
    EmployeeID: "",
    Department: "",
    Designation: "",
    Project: "",
    Type: "",
    Status: "",
    Image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Image") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result); // Set the image preview
        };
        reader.readAsDataURL(file); // Convert image file to base64
        setEmployeeData((prevData) => ({ ...prevData, Image: file })); // Update employee data
      } else {
        setImagePreview(null);
        setEmployeeData((prevData) => ({ ...prevData, Image: null }));
      }
    } else {
      setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (const key in employeeData) {
      formdata.append(key, employeeData[key]);
    }
    try {
      const response = await axios.post(
        "https://employee-management-server-i9vw.onrender.com/employee/create",
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );


      navigate("/");
    } catch (error) {
      console.error(
        "Error adding employee:",

      );
    }
  };

  const handleCancel = () => {
    setEmployeeData({
      EmployeeName: "",
      EmployeeID: "",
      Department: "",
      Designation: "",
      Project: "",
      Type: "",
      Status: "",
      Image: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="">
      <div
        className="flex items-center mb-2 cursor-pointer"
        onClick={handleCancel}
      >
        <Link to={"/"}>
          <span className="material-icons mr-2 text-3xl mt-1">arrow_back</span>
        </Link>
        <h1 className="text-3xl font-bold">Add New Employee</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 border rounded shadow-md"
      >
        <div className="mb-4">
          <label
            className="custum-file-upload"
            onClick={() => document.getElementById("Image").click()}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 w-32 object-cover rounded border"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-camera"
                viewBox="0 0 16 16"
                style={{ cursor: "pointer" }}
              >
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
              </svg>
            )}
            <input
              type="file"
              accept=".png, .jpeg, .jpg"
              ref={fileInputRef} // Attach the ref here
              style={{ display: "none" }}
              name="Image"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <label className="block mb-1" htmlFor="name">
              Employee Name*
            </label>
            <input
              type="text"
              id="name"
              name="EmployeeName"
              value={employeeData.EmployeeName}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block mb-1" htmlFor="employeeId">
              Employee ID*
            </label>
            <input
              type="text"
              id="employeeId"
              name="EmployeeID"
              value={employeeData.EmployeeID}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <label className="block mb-1" htmlFor="department">
              Department*
            </label>
            <select
              id="department"
              name="Department"
              value={employeeData.Department}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            >
              <option value="">Select a department</option>
              <option value="HR">Human Resources</option>
              <option value="IT">Information Technology</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div className="w-1/2 pl-2">
            <label className="block mb-1" htmlFor="designation">
              Designation*
            </label>
            <select
              id="designation"
              name="Designation"
              value={employeeData.Designation}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            >
              <option value="">Select a designation</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="Analyst">Analyst</option>
              <option value="Designer">Designer</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <label className="block mb-1" htmlFor="project">
              Project*
            </label>
            <input
              type="text"
              id="project"
              name="Project"
              value={employeeData.Project}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block mb-1" htmlFor="type">
              Type*
            </label>
            <select
              id="type"
              name="Type"
              value={employeeData.Type}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            >
              <option value="">Select a type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <label className="block mb-1" htmlFor="status">
              Status*
            </label>
            <input
              type="text"
              id="status"
              name="Status"
              value={employeeData.Status}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="reset"
            onClick={handleCancel}
            className="bg-gray-300 text-black py-2 px-4 mr-3 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 mr-3 rounded"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};
