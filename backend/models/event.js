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
            default: "https://imgs.search.brave.com/t4AHxPlgrAcFoPfqEHO5U2w3OFZsFCNHBTzlPPSrL_4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kMWNz/YXJrejhvYmU5dS5j/bG91ZGZyb250Lm5l/dC9wb3N0ZXJwcmV2/aWV3cy91cGNvbWlu/Zy1ldmVudHMtc2No/ZWR1bGUtdmlkZW8t/ZGVzaWduLXRlbXBs/YXRlLTc3NGU0YTU2/ZDYxNDRhZjc2NTM2/MmU4OGMxYmFjMWZk/LmpwZz90cz0xNjk4/MDMxOTI4"
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