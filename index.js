const express = require('express')
const server = require('./db')
const app = express()
const PORT=3000;

server()
app.use(express.json())

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.json({
    "name":"rijwan",
  })
})

app.use("/api/userauth",require("./routes/userauth"))
app.use("/api/products",require("./routes/products"))


app.listen(PORT,()=>{
    console.log(`The app start at ${PORT}`)
})