exports.getPatientDashboard = (req, res) => {
  return res.json({
    name: "Devansh",
    age: 21,
    bloodGroup: "B+",

    // Biomedical Sensor Values (Dummy)
    ecgHeartRate: 72,       // BPM
    pulseRate: 78,          // BPM
    bodyTemp: 36.7,         // Celsius
    spo2: 97,               // %
    hrv: 52,                // ms

    // Stress metrics
    stressScore: 68,
    stressLevel: "Moderate",
    condition: "Mild Stress",
    lastUpdated: "Today, 10:30 AM",

    wellnessTip:
      "Try 4-7-8 breathing for 3 minutes to reduce heart rate and calm your mind.",
    activitySuggestion:
      "Take a short 20-minute walk. Avoid phone usage during this to relax your mind.",

    weeklyStress: [
      { day: "Mon", score: 60 },
      { day: "Tue", score: 72 },
      { day: "Wed", score: 65 },
      { day: "Thu", score: 70 },
      { day: "Fri", score: 80 },
      { day: "Sat", score: 62 },
      { day: "Sun", score: 55 },
    ],
  });
};

