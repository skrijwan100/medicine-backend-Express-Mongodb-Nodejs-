const express = require('express')
const server = require('./db')
const cors = require('cors')
const app = express()
const PORT=5000;

server()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests only from frontend
  methods: 'GET, POST, PUT, DELETE', // Allow specific methods
  allowedHeaders: 'Content-Type, Authorization, auth-token,admin-token', // Add allowed headers
  credentials: true, // Allow credentials like cookies or authentication headers
}));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.json({
    "name":"rijwan",
  })
})

app.use("/api/userauth",require("./routes/userauth"))
app.use("/api/products",require("./routes/products"))
app.use("/api/order",require("./routes/orderplace"))
app.use("/api/doctor",require("./routes/doctor"))
app.use("/api/doctorbook",require("./routes/bookdoctor"))


app.listen(PORT,()=>{
    console.log(`The app start at ${PORT}`)
})