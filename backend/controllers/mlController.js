const axios = require("axios");

exports.getStressPrediction = async (req, res) => {
  try {
    console.log("Incoming body from Postman:", req.body);

    const mlResponse = await axios.post(
      "http://127.0.0.1:8000/predict",
      req.body,   // 🔴 THIS MUST BE req.body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("ML Prediction:", mlResponse.data);

    return res.status(200).json(mlResponse.data);

  } catch (error) {
    console.error("ML API ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      message: "Failed to get stress prediction",
      error: error.response?.data || error.message,
    });
  }
};
