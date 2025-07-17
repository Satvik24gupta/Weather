const express = require('express')
const app = express()
const port = 4444
const connectDB = require('./db/db');
connectDB()
const cors = require('cors')

app.use(cors())
const router=require('./routers/user.routes')
app.use(express.json())
app.use('/', router)
app.listen(port, ()=>{
    console.log("server is running at: http://localhost:"+port)
})