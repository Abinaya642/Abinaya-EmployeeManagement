import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../MyContext/Context";

export const EditEmployee = () => {
  const { selectId, setData, data } = useContext(Context);
  const navigate = useNavigate();
  console.log(selectId);
  console.log(data);

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://employee-management-server-i9vw.onrender.com/employee/getById/${selectId}`
      )
      .then((res) => {
        setData(res.data.response);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
  
    if (type === "file" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        console.log("Image loaded:", reader.result); // Check the image data
        setImagePreview(reader.result); // Set image preview for UI
      };
      reader.readAsDataURL(file); // Convert image file to base64
      setData((prevData) => ({
        ...prevData,
        [name]: file, // Store file in the data state
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("EmployeeName", data.EmployeeName);
    formData.append("EmployeeID", data.EmployeeID);
    formData.append("Department", data.Department);
    formData.append("Designation", data.Designation);
    formData.append("Project", data.Project);
    formData.append("Type", data.Type);
    formData.append("Status", data.Status);

    if (data.Image) {
      formData.append("Image", data.Image); // Append the image file
    }

    try {
      const response = await axios.put(
        `
        https://employee-management-server-i9vw.onrender.com/employee/update/${selectId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/"); // Redirect after successful update
    } catch (error) {
      toast.error(error.message);
      console.error("Error during update:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="">
      <div className="flex items-center mb-2 cursor-pointer">
        <Link to={"/"}>
          <span className="material-icons mr-2 text-3xl mt-1">arrow_back</span>
        </Link>
        <h1 className="text-3xl font-bold">Edit Employee Details</h1>
      </div>
      <form
        className="bg-white p-6 border rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
  <label className="block mb-1 cursor-pointer">
    Click here to upload different Image....
    <input
      type="file"
      name="Image"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleChange}
    />
  </label>
  {imagePreview && ( // Check if imagePreview is defined
    <img
      src={imagePreview}
      alt="Preview"
      className="mt-2 h-32 w-32 object-cover rounded border"
    />
  )}
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
              value={data.EmployeeName}
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
              value={data.EmployeeID}
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
              value={data.Department}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            >
              <option value="">Select a department</option>
              <option value="HR">Human Resources</option>
              <option value="IT">Information Technology</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="w-1/2 pl-2">
            <label className="block mb-1" htmlFor="designation">
              Designation*
            </label>
            <select
              id="designation"
              name="Designation"
              value={data.Designation}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            >
              <option value="">Select a designation</option>
              <option value="Manager">Manager</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Analyst">Analyst</option>
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
              value={data.Project}
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
              value={data.Type}
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
              value={data.Status}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="reset"
            className="bg-gray-300 text-black py-2 px-4 mr-3 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 mr-3 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
