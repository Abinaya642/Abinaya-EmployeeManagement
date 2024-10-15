import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Context from "../MyContext/Context";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const EmployeeStore = () => {
  const { data, setData, selectId, setSelectId } = useContext(Context);
  const [filteremp, setFilteremp] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    axios
      .get(
        "https://employee-management-server-i9vw.onrender.com/employee/getAll"
      )
      .then((res) => {
        setData(res.data.data);
        setFilteremp(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteClick = (employeeId) => {
    setSelectId(employeeId);
    setShowModal(true); // Show confirmation modal
  };

  const handleViewClick = (employee) => {
    setSelectId(employee);
    navigate("/ViewEmployee");
  };

  const handleEditClick = (employee) => {
    setSelectId(employee);
    navigate("/EditEmployee");
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredemp = data.filter((employee) => {
      return (
        employee.EmployeeName &&
        employee.EmployeeName.toLowerCase().includes(searchText)
      );
    });
    setFilteremp(filteredemp);
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://employee-management-server-i9vw.onrender.com/employee/delete/${selectId}`
      )
      .then((res) => {
        // toast.success(res.data.message);
        fetchdata();
        setShowModal(false); // Close modal after deletion
      })
      .catch((err) => {
        // toast.error(err.message);
        console.log(err);
      });
  };

  return (
    <>
      <div className="p-4">
        {/* <ToastContainer/> */}
        <h2 className="text-3xl font-bold mb-4">Employee</h2>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search Employees by Name"
            className="border rounded p-2 w-1/2"
            onChange={handleSearch}
          />
          <Link to="/AddEmployee">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Add Employee
            </button>
          </Link>
        </div>

        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Employee Name</th>
              <th className="py-2 px-4 border">Employee ID</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Designation</th>
              <th className="py-2 px-4 border">Project</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>

          {filteremp && filteremp.length > 0 ? (
            <tbody>
              {filteremp.map((employee) => (
                <tr key={employee._id}>
                  <td className="py-2 px-4 border flex gap-2">
                    <img
                      src={employee.Image}
                      alt="employee-img"
                      className="h-10 w-10 rounded-lg"
                    />
                    {employee.EmployeeName}
                  </td>
                  <td className="py-2 px-4 border">{employee.EmployeeID}</td>
                  <td className="py-2 px-4 border">{employee.Department}</td>
                  <td className="py-2 px-4 border">{employee.Designation}</td>
                  <td className="py-2 px-4 border">{employee.Project}</td>
                  <td className="py-2 px-4 border">{employee.Type}</td>
                  <td className="py-2 px-4 border">{employee.Status}</td>
                  <td>
                    <button
                      onClick={() => handleViewClick(employee._id)}
                      className="text-gray-500 mr-2 ml-4"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEditClick(employee._id)}
                      className="text-gray-500 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(employee._id)}
                      className="text-gray-500"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={12} className="text-center">
                  No Employee Found
                </td>
              </tr>
            </tbody>
          )}
        </table>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h3 className="text-lg font-bold mb-4">Delete Employee</h3>
              <p className="mb-4">
                Are you sure you want to delete this employee?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
