const express = require("express")

const router = express.Router()

router.post("/get-by-question-id", (req, res) => {
	res.json({
		success: true,
		results: [],
	})
})

router.post("/add", (req, res) => {
	res.json({ success: true, })
})
