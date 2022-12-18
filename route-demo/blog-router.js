const express = require("express")

const router = express.Router()

router.post("/get-by-text", (req, res) => {
	res.json({
		success: true,
		results: [],
	})
})

router.post("/add", (req, res) => {
	res.json({ success: true, })
})

module.exports = router

