const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")

const blogRouter = require("./route/blog-router")
const commentRouter = require("./route/comment-router")
const questionRouter = require("./route/question-router")
const userRouter = require("./route/user-router")

mongoose.connect("mongodb://localhost/fanos")
const db = mongoose.connection
db.once("open", () => {
    console.log("connected to DB")
})

const app = express()
app.use(express.json())
app.use(cors())
app.use("/blog", blogRouter)
app.use("/comment", commentRouter)
app.use("/question", questionRouter)
app.use("/user", userRouter)

app.use((err, req, res, next) => {
	console.log("error gottcha", err)
	res.json({
		success: false,
		message: err.message,
	})
})

app.listen(5000)

