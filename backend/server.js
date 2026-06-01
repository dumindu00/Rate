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
      `https://newsapi.org/v2/top-headlines?language=en&pageSize=30&apiKey=${process.env.NEWS_API_KEY}`
    );

    const trustedSources = [
      "BBC News",
      "CNN",
      "Reuters",
      "CNBC",
      "The New York Times",
      "Al Jazeera English"
    ];

    const rankedEvents = response.data.articles.map(article => {
      let score = 0;

      // Source credibility
      if (trustedSources.includes(article.source?.name)) {
        score += 30;
      }

      // Keyword importance
      const importantWords = [
        "breaking",
        "war",
        "summit",
        "election",
        "crisis",
        "global",
        "major"
      ];

      const title = article.title?.toLowerCase() || "";

      importantWords.forEach(word => {
        if (title.includes(word)) {
          score += 15;
        }
      });

      // Recency
      const publishedTime = new Date(article.publishedAt).getTime();
      const now = Date.now();
      const hoursOld = (now - publishedTime) / (1000 * 60 * 60);

      score += Math.max(0, 50 - hoursOld);

      return {
        ...article,
        trendScore: Math.round(score)
      };
    });

    rankedEvents.sort((a, b) => b.trendScore - a.trendScore);

    res.json(rankedEvents);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});app.get("/events", async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?language=en&pageSize=30&apiKey=${process.env.NEWS_API_KEY}`
    );

    const trustedSources = [
      "BBC News",
      "CNN",
      "Reuters",
      "CNBC",
      "The New York Times",
      "Al Jazeera English"
    ];

    const rankedEvents = response.data.articles.map(article => {
      let score = 0;

      // Source credibility
      if (trustedSources.includes(article.source?.name)) {
        score += 30;
      }

      // Keyword importance
      const importantWords = [
        "breaking",
        "war",
        "summit",
        "election",
        "crisis",
        "global",
        "major"
      ];

      const title = article.title?.toLowerCase() || "";

      importantWords.forEach(word => {
        if (title.includes(word)) {
          score += 15;
        }
      });

      // Recency
      const publishedTime = new Date(article.publishedAt).getTime();
      const now = Date.now();
      const hoursOld = (now - publishedTime) / (1000 * 60 * 60);

      score += Math.max(0, 50 - hoursOld);

      return {
        ...article,
        trendScore: Math.round(score)
      };
    });

    rankedEvents.sort((a, b) => b.trendScore - a.trendScore);

    res.json(rankedEvents);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});
app.listen(5000, () => {
    console.log("Server running on port 5000..✅✅😎")
})