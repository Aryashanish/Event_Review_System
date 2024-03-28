const { Router } = require("express");
const { userModel } = require("../models/user");

const router = Router();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);

    // Check if email or password is missing
    if (!email || !password) {
        return res.status(400).json({ "msg": "Email or password is missing" });
    }
    
    // Check if the email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ "msg": "Email already exists" });
    }

    // Create the new user
    try {
        const result = await userModel.create({
            email,
            password
        });
        // console.log(result);
        return res.status(201).json({ "msg": "User created successfully", "user": result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "msg": "Internal server error" });
    }
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    //console.log(req.body);
    try {
        const token = await userModel.matchpassword(email, password);
        const user = await userModel.findOne({ email });
        // console.log(user);
        return res.cookie("token",token,{ sameSite: "None", secure: true }).status(201).json({"msg" : user});
    } catch (err) {
        return res.status(404).json({"msg" : "Somthing is Wrong, Try Again !"});
    };
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
})

module.exports = {router};