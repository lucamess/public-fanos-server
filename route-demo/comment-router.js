const express = require("express")
const comments = require("./db-demo/comments")

const router = express.Router()

router.post("/get-by-question-id", (req, res) => {
	const { questionId } = req.body

	res.json({
		success: true,
		results: comments.filter(item => item.questionId == questionId)
	})
})

router.post("/add", (req, res) => {
	res.json({ success: false, })
})

module.exports = router
