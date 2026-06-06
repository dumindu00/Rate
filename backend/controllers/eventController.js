const newsService = require("../services/newsService")
const getCategory = require("../utils/categoryHelper")
const calculateTrendScore = require("../utils/trendScoreHelper")

const getEvents = async(req, res) => {
    try {
        const articles = await newsService.getNews()

        const processedEvents = articles.map(article => ({
            ...article,
            category: getCategory(article.title),
            trendScore: calculateTrendScore(article)
        }))

                    processedEvents.sort(
                (a, b) => b.trendScore - a.trendScore
            );

            res.json(processedEvents)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: "Filed to fetch events"
        })
    }
}

module.exports = {
    getEvents
}