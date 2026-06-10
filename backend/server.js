const dotenv = require("dotenv")

dotenv.config()
const express = require("express")
const cors = require("cors")


const connectDB = require("./config/db")
const eventRoutes = require("./routes/eventRoutes")
const brandRoutes = require("./routes/brandRoutes")
const authRoutes = require("./routes/authRoutes")


const app = express()
connectDB()

app.use(cors())
app.use(express.json())
// server.js
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.use("/", eventRoutes)
app.use("/", brandRoutes)
app.use("/", authRoutes)


app.get("/", (req, res) => {
    res.send("API Running");
})


const PORT = process.env.PORT || 5000;



app.listen(5000, () => {
    console.log(`Server running on port ${5000}..✅✅😎`)
})