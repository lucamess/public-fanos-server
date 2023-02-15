const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")

const routeFolder = "route-demo"

const blogRouter = require(`./${routeFolder}/blog-router`)
const commentRouter = require(`./${routeFolder}/comment-router`)
const questionRouter = require(`./${routeFolder}/question-router`)
const userRouter = require(`./${routeFolder}/user-router`)

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
		errorList: err.errorList,
	})
})

app.listen(process.env.PORT || 5000)

