const {mongoose, Schema} = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "events",
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "users",
        }
    },
    { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = { commentModel };