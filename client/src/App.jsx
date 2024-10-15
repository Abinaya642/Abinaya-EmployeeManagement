import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { EmployeeStore } from "./Components/EmployeeStore";
import { AddEmployee } from "./Components/AddEmployee";
import { ViewEmployee } from "./Components/ViewEmployee";
import { EditEmployee } from "./Components/EditEmployee";
import { Navbar } from "./Components/Navbar";

import Sidebar from "./Components/Sidebar";
import { useState } from "react";

import Context from "./MyContext/Context";


export const App = () => {
  const [data,setData]=useState({
    EmployeeName: '',
    EmployeeID: '',
    Department: '',
    Designation: '',
    Project: '',
    Type: '',
    Status: '',
    Image: null,

  })
  const [selectId,setSelectId]=useState("");

  return (
            <div className="flex-1 flex flex-col">
              {/* Navbar component */}
          <Navbar />
          <div className="flex h-screen">
          {/* Sidebar components */}
            <Sidebar/>
            <div className="flex-1 p-4 overflow-y-auto">
            <Context.Provider value={{data,setData,selectId,setSelectId}}>
             
              <Routes>
                <Route path="/" element={<EmployeeStore />}></Route>
                <Route path="/AddEmployee" element={<AddEmployee />}></Route>
                <Route path="/ViewEmployee" element={<ViewEmployee />}></Route>
                <Route path="/EditEmployee" element={<EditEmployee />}></Route>
              </Routes>

              </Context.Provider>

            </div>
          </div>
        </div>
  );
};
