const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { PORT } = require("./config")
const authRoutes = require("./routes/auth")
const { ppid } = require("process")

const { BadRequestError, NotFoundError } = require("./utils/errors")

const app = express()

// enables cross-origin resource sharing for all origins
app.use(cors())
// parse incoming request bodies with JSON payloads
app.use(express.json())
// log request info
app.use(morgan("tiny"))

app.use("/auth", authRoutes)

app.use((req,res,next) => {
    return next(new NotFoundError())
})

app.use((req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: { message,status }
    })
})

// const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running http://localhost:${PORT}`)
})