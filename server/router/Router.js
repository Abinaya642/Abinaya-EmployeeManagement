const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controller/Controller");

const upload = require("../config/multer");

const router = express.Router();

//Employee Creation with image upload
router.post("/create", upload.single("Image"), createEmployee);

// Read the all employees
router.get("/getAll", getAllEmployees);

// Get employee details by ID
router.get("/getById/:id", getEmployeeById);

// Update employee details with image upload
router.put("/update/:id", upload.single('Image'), updateEmployee);

// Delete employee using id
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
