require('dotenv').config();
const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 3000
const submitRouter = require('./routes/submit')
const statusRouter = require('./routes/status')
const redisClient = require('./redis')
app.use(express.json())
app.use(express.text())

app.get('/api/v1/hello',(req,res,next)=>{
    res.status(200).send({
        status: true,
        message: 'API is up and running. Hello World!!!'
    })
})

app.use('/api/v1/submit',submitRouter)
app.use('/api/v1/status',statusRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`)
})