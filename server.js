const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000; // Choose any available port

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/api/endpoint/health", (req, res) => {
    res.json({ "responseData": "server Up" })
  });

// Route to handle login requests
app.post('/api/endpoint/login', async (req, res) => {
    const { Number, password } = req.body;
    const data=req.body.query;
    console.log("Called servernows1",data.Number.value)
    console.log("Called servernows2",data.password.value)

    try {
        // Replace with your actual API URL
        const response = await axios.post('http://13.50.183.255:9003/user-service/auth/login', {
            "username": data.Number.value,
            "password": data.password.value
        });

        // Forward the response data back to the client
        res.status(response.status).json(response.data);
    } catch (error) {
        // Handle any errors that occur during the request
        console.log(error)
        res.status(error.response?.status || 500).json({
            success: false,
            message: error.message,
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
