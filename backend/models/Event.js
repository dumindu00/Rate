const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        content: String,
        source: String,
        category: String,
        trendScore: Number,
        imageUrl: String,
        articleUrl: String,
        publishedAt: Date
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Event", eventSchema);