const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const axios = require("axios")


const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log("MongoDB Connected😎✅"))
    .then(err => console.log(err))

app.get("/events", async (req, res) => {
    
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?language=en&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`
        )

        res.json(response.data.articles)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events." })
    }
})

app.listen(5000, () => {
    console.log("Server running on port 5000..✅✅😎")
})