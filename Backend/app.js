const express = require('express')
const app = express()
const port = 4444
const connectDB = require('./db/db');
const dotenv = require('dotenv')
dotenv.config()
connectDB()
const cors = require('cors')

app.use(cors())
const router=require('./routers/user.routes')
const historyRouter = require('./routers/history.routes')

app.use(express.json())
app.use('/', router)
app.use('/history', historyRouter)
app.listen(port, ()=>{
    console.log("server is running at: http://localhost:"+port)
})