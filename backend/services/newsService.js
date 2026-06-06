const axios = require("axios")

const getNews = async () => {
    const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?language=en&pageSize=30&apiKey=${process.env.NEWS_API_KEY}`
    );

    return response.data.articles;
}

module.exports = {
    getNews
}