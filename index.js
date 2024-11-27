const express = require('express')
const server = require('./db')
const cors = require('cors')
const app = express()


server()
require('dotenv').config();
app.use(express.json())
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,  // Allow requests only from frontend
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


app.listen(process.env.PORT,()=>{
    console.log(`The app start at ${process.env.PORT}`)

})