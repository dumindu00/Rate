const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const connectDB = require("./config/db")
const eventRoutes = require("./routes/eventRoutes")
const brandRoutes = require("./routes/brandRoutes")
const authRoutes = require("./routes/authRoutes")
const uploadRoutes = require("./routes/uploadRoutes")

dotenv.config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/", eventRoutes)

app.get("/", (req, res) => {
    res.send("API Running");
})

app.use("/", brandRoutes)
app.use("/", authRoutes)
app.use("/", uploadRoutes)


const PORT = process.env.PORT || 5000;



app.listen(5000, () => {
    console.log(`Server running on port ${5000}..✅✅😎`)
})