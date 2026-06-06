function calculateTrendScore(article) {
    let score = 0;

    const trustedSources = [
        "CNN",
        "BBC News",
        "Reuters",
        "CNBC",
        "Al Jazeera English",
        "ABC"
    ]
    if (trustedSources.includes(article.source?.name)) {
        score += 30
    }

    const importantWords = [
        "breaking",
        "war",
        "global",
        "summit",
        "crisis",
        "election"
    ]

    const title = article.title?.toLowerCase() || "";

    importantWords.forEach(word => {
        if (title.includes(word)) {
            score += 15
        }
    });

    const publishedTime = new Date(article.publishedAt).getTime()
    const now = Date.now()

    const hoursOld = (now - publishedTime) / (1000 * 60 * 60);

    score += Math.max(0, 50 - hoursOld);

    return Math.round(score);
}

module.exports = calculateTrendScore;