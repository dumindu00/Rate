const mongoose = require("mongoose")

const voteSchema = new mongoose.Schema({
    userId: String,
    vote: {
        type: String,
        enum: ["like", "dislike"]
        }
    },
    {
        _id: false
    }
)

const brandSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    logoUrl: {
        type: String,
        required: true
    },

    likes: {
        type: Number,
        default: 0
    },

    dislikes: {
        type: Number, 
        default: 0
    },

    voters: [voteSchema]
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Brand", brandSchema)