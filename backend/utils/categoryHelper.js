function getCategory (title = "") {
    const text = title.toLowerCase()

    if (
        text.includes("ai") ||
        text.includes("technology") ||
        text.includes("google") ||
        text.includes("microsoft")
    ) {

    return "Technology";
    }
    if (
        text.includes("football") ||
        text.includes("cricket") ||
        text.includes("sports") 
    ) {
        return "Sports"
    }

    if (
        text.includes("market") ||
        text.includes("economy") ||
        text.includes("business")
    )
        {
            return "Business"
    }

    if (
        text.includes("election") ||
        text.includes("government") ||
        text.includes("president") 
    ) 
        {
            return "Politics"
    }
    return "General"
}

module.exports = getCategory