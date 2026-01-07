const express = require("express");
const router = express.Router();
const { getStressPrediction } = require("../controllers/mlController");

router.post("/predict", getStressPrediction);

module.exports = router;
