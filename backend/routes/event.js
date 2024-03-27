const { Router } = require("express");
const { eventModel } = require("../models/event");
const { commentModel } = require("../models/comment");
const multer = require("multer");
const path = require("path");

const eventRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads/'))
    },
    filename: function (req, file, cb) {
        const uniquefilename = `${Date.now()}-${file.originalname}`;
      cb(null,  uniquefilename)
    }
  })
  
  const upload = multer({ storage: storage })

  eventRouter.get("/add-blog", (req, res) => {
    res.render("addblog", {
        user: req.user
    });
})

eventRouter.get("/:id", async (req, res) => {
  const blog = await eventModel.findById(req.params.id).populate("createdBy");
  const comments = await commentModel.find({ eventId: req.params.id }).populate("createdBy");
  console.log("com", comments);
  return res.status(201).json({
    user: req.user,
    message: '',
    blog:blog,
    comments:comments,
  })
})

eventRouter.post("/", async (req, res) => {
    //console.log(req.body);
  const result = await eventModel.create({
        title: req.body.title,
        body: req.body.body,
        createdBy: req.body.user_id,
        coverImgURL: req.body.imgurl,
        like: 0,
        report: 0,
    })
    console.log(result);
    res.status(201).json({"msg":result});
})


eventRouter.post("/comment/:blogId", async (req, res) => {
  console.log(req.body);
  const result = await commentModel.create({
    content: req.body.content,
    eventId: req.params.blogId,
    createdBy: req.body.user_id,
  });

  return res.status(201).json({"msg":result});
})

eventRouter.put("/like/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await eventModel.findById(blogId);
    
    // If blog not found
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Increment the like count by one
    blog.like += 1;

    // Save the updated blog
    const updatedBlog = await blog.save();

    // Return the updated blog with the incremented like count
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

eventRouter.put("/dislike/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await eventModel.findById(blogId);
    
    // If blog not found
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Increment the like count by one
    blog.like -= 1;

    // Save the updated blog
    const updatedBlog = await blog.save();

    // Return the updated blog with the incremented like count
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

eventRouter.put("/report/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await eventModel.findById(blogId);
    
    // If blog not found
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Increment the like count by one
    blog.report += 1;

    // Save the updated blog
    const updatedBlog = await blog.save();

    // Return the updated blog with the incremented like count
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = {eventRouter};