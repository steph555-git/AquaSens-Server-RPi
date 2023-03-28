const express = require('express')
const app = express()
const port = 3000

const routeSensorsAPI = require('./routes/routes')

app.use('/api/sensors', routeSensorsAPI)


app.listen(3000, () => console.log(`server is liseting on port ${port}`))
