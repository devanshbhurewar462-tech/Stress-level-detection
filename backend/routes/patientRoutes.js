// backend/routes/patientRoutes.js
const express = require("express");
const router = express.Router();
const { getPatientDashboard } = require("../controllers/patientController");

// GET /api/patient/dashboard
router.get("/dashboard", getPatientDashboard);

module.exports = router;
