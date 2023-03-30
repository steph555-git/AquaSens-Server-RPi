const express = require('express')
const app = express()
const port = 4000

const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
const cors = require('cors')
app.use(cors())

const getDataTemperature = require('./mw/getDataSensorsForSocketIO')

const routeSensorsAPI = require('./routes/routes')
app.use('/api/sensors', routeSensorsAPI)


const dataTemp = async () => {
    return getDataTemperature()
}

io.on('connection', async (socket) => {
    console.log('connection success')
    setInterval(async () => {
        socket.emit('data', { sensors: await dataTemp() })
        console.log(await dataTemp())
    }, 2000)
})

server.listen(4000, () => console.log(`server is listening on port ${port}`))
