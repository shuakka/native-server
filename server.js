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
    console.log("Got it")
    res.json({ "responseData": "server Up" })
  });

// Route to handle login requests
app.post('/api/endpoint/login',async (req, res) => {
    const { Number, password } = req.body;
    const data=req.body.query;
    // console.log(req.body,"Called servernows1",data.Number)
    // console.log("Called servernows2",data.password)

    try {
        // Replace with your actual API URL
        const response = await axios.post('http://13.50.183.255:9003/user-service/auth/login', {
            "username": data.Number,
            "password": data.password
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

app.post('/api/endpoint/logout', async (req, res) => {
    const { Number, password } = req.body;
    const data=req.body.query;
    const token=data.token.value
    console.log("Called servernows1",data.token.value)

    try {
        // Replace with your actual API URL
        const response = await axios.post(`http://13.50.183.255:9003/user-service/auth/logout?token=${token}`
       );

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

app.post('/api/endpoint/checkin', async (req, res) => {
    const querystring=req.body.query;
    console.log("Called servernows1",querystring.userId)
    var token = querystring.Authorization;
    var date = new Date();
    var formattedDate = date.getFullYear() + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2) + ' ' +
    ('0' + date.getHours()).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2) + ':' +
    ('0' + date.getSeconds()).slice(-2);

console.log(token);
    console.log("Called servernows2token---",typeof (querystring.userId))
    const data={
        "userId": querystring.userId,
        "date": formattedDate,
        "checkIn": formattedDate,
        "latitude": "14.989898",
        "longitude": "22.989898",
        "remarks": "Test 1"
        }
    const axiosConfig = {
        headers: {
          Authorization: ` ${token}`,
           "Content-Type": "application/json"
        },
      };
      console.log(data,"-Complete data")
      console.log("config of axios",axiosConfig)
    try {
        // Replace with your actual API URL
        const response = await axios.post('http://13.50.183.255:9003/user-service/attendance/checkIn',data,axiosConfig );

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

app.post('/api/endpoint/checkout', async (req, res) => {
    const querystring=req.body.query;
    console.log("Called servernows1",querystring.userId)
    var token = querystring.Authorization;
    var userId = querystring.userId;
    var date = new Date();
    var formattedDate = date.getFullYear() + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2) + ' ' +
    ('0' + date.getHours()).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2) + ':' +
    ('0' + date.getSeconds()).slice(-2);

console.log(formattedDate);
    const data={
        "id": userId,
        "checkOut": formattedDate
    }
    const axiosConfig = {
        headers: {
          Authorization: ` ${token}`,
        },
      };
      console.log("all data----------",data)
    try {
        // Replace with your actual API URL
        const response = await axios.post('http://13.50.183.255:9003/user-service/attendance/checkOut', data,axiosConfig);

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

app.get('/api/endpoint/attendanceHistory', async (req, res) => {
    const querystring=req.body.query;
    console.log("Called serverntokentokentokentokenows1--",JSON.stringify(req.query))
    var token = req.query.Authorization;
    console.log("Called token--",req.query.Authorization)
    const axiosConfig = {
        headers: {
          Authorization: `${token}`,
        },
      };
    try {
        // Replace with your actual API URL
        const response = await axios.get('http://13.50.183.255:9003/user-service/attendance/getAttendanceHistory',axiosConfig);

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


//Worker API
app.get('/api/endpoint/userDetail', async (req, res) => {
    var token = req.headers.token;
    const userId=req.body.query.userId;

    console.log("Called servernows1",userId)
 
    const axiosConfig = {
        headers: {
          Authorization: ` ${token}`,
        },
      };
    try {
        // Replace with your actual API URL
        const response = await axios.get(`http://13.50.183.255:9003/user-service/users/user/${userId}`,axiosConfig);

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

app.post('/api/endpoint/updateUser', async (req, res) => {
    var token = req.headers.token;
    const querydata=req.body.query;
    const firstName=querydata.firstName
    const lastName=querydata.lastName
    const userId=querydata.userId
    console.log("Called servernows1",querydata.userId)

    const data={
        "id": userId,
        "firstName": firstName,
        "lastName": lastName
    }
    const axiosConfig = {
        headers: {
          Authorization: ` ${token}`,
        },
      };
    try {
        // Replace with your actual API URL
        const response = await axios.post('http://13.50.183.255:9003/user-service/users/updateUser', data,axiosConfig);

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
