const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoose } = require("mongoose");
const { eventModel } = require("./models/event");
const PORT = 8000;
const app = express();
const { router } = require("./routes/user");
const { eventRouter } = require("./routes/event");

//connect database
mongoose.connect("mongodb://localhost:27017/Event-Review-System")
.then(() => {
    console.log("Connection Successfull");
}).catch((err) => {
    console.log("Not Able to Connect ", err);
});


//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    const allevents = await eventModel.find({});
    return res.status(201).json({ "events": allevents });
});
 
app.use("/user", router);
app.use("/event", eventRouter);

app.listen(PORT, () => {
    console.log("Server Start on Port 8000");
});