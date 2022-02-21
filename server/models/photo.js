const mongoose = require("mongoose");

const Photo = mongoose.model(
    "Photo",
    new mongoose.Schema(
        {

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

module.exports = Photo;


