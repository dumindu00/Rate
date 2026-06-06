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

            const {search, category} = req.query;

            let filteredEvents = processedEvents

            if (search) {
                filteredEvents = filteredEvents.filter(event => 
                    event.title?.toLowerCase().includes(search.toLowerCase())
                )
            }

            if (category && category !== "All") {
                filteredEvents = filteredEvents.filter(
                    event => event.category === category
                )
            }

                    filteredEvents.sort(
                (a, b) => b.trendScore - a.trendScore
            );

            res.json(filteredEvents)
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