const Employee = require("../model/empModel");
const cloudinary = require("cloudinary").v2;

// Employee data creation
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

const createEmployee = async (req, res) => {
  try {
    const {EmployeeName,EmployeeID,Department,Designation,Project,Type,Status,} = req.body;

    // Validate required fields
    if ( !EmployeeName ||!EmployeeID ||!Department || !Designation || !Project ||!Type ||!Status ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    let imageUrl = "";
    // Upload to Cloudinary
    if (req.file) {
      //  buffer to base64 conversion
      const base64Image = req.file.buffer.toString("base64");
      const imageData = `data:${req.file.mimetype};base64,${base64Image}`;

      // Upload the base64 image to Cloudinary
      const result = await cloudinary.uploader.upload(imageData, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });
      // Getting secure_url from Cloudinary
      imageUrl = result.secure_url; 
      console.log(result)
    }
    //new employee creation
    const newEmployee = new Employee({
      ...req.body,
      Image: imageUrl, // Save image url to database
    });

    // Save to database
    await newEmployee.save();

    // created employee response
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      response: newEmployee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating employee",
      error: error.message,
    });
  }
};

// get All Employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving employees",
      error: error.message,
    });
  }
};

// Get Employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const EmpData = await Employee.findById(id);
    if (!EmpData) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Employee details found",
      success: true,
      response: EmpData,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal error",
      success: false,
      error: err.message,
    });
  }
};
const updateEmployee = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Fetching the existing employee using id
      const existingEmployee = await Employee.findById(id);
      if (!existingEmployee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found.",
        });
      }
  
      let imageUrl = existingEmployee.Image; // Keep the existing image url by default
  
      // If a new file is uploaded, handle the image update
      if (req.file) {
        // Upload new image to Cloudinary
        const newImageUrl = await uploadToCloudinary(req.file.buffer);
        imageUrl = newImageUrl; // Update image URL
      }
  
      // Update employee details
      const updatedEmployee = await Employee.findByIdAndUpdate(id,
        {$set:{ ...req.body, Image: imageUrl} },
        { new: true ,runValidators:true}
      );
  if(!updatedEmployee){
    return res.status(400).json({
      success: false,
      message: "Employee updated failed",
    });
  }
      res.status(200).json({
        success: true,
        message: "Employee updated successfully",
        response: updatedEmployee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating employee",
        error: error.message,
      });
    }
  };


  const deleteEmployee = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the employee using id
      const employeeToDelete = await Employee.findById(id);
      if (!employeeToDelete) {
        return res.status(404).json({
          success: false,
          message: "Employee not found.",
        });
      }
  
      // Delete the image from Cloudinary
      const publicId = employeeToDelete.Image.split('/').pop().split('.')[0]; // Assuming Image URL format
      await cloudinary.uploader.destroy(publicId); // Delete image from Cloudinary
  
      // Delete employee from database
      await Employee.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Employee deleted successfully",
        response: employeeToDelete,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting employee",
        error: error.message,
      });
    }
  };
  

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

