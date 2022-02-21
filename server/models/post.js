const mongoose = require("mongoose");

const Post = mongoose.model(
    "Post",
    new mongoose.Schema(
        {

            desc: {
                type: String,
            },
            username: {
                type: String,
            },
            img: {
                type: String,
            },
            imageUrlPath: {
                type: String,
            },

        },
        { timestamps: true },

    )
)

module.exports = Post;
