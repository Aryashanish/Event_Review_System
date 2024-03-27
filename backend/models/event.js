const {mongoose, Schema} = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        coverImgURL: {
            type: String,
            required: false,
        },
        like: {
            type: Number,
            required: false,
        },
        report: {
            type: Number,
            required: false,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "users",
        }
    },
    { timestamps: true }
);

const eventModel = mongoose.model("events", eventSchema);

module.exports = { eventModel };