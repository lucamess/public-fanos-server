const express = require("express")
const questions = require("./db-demo/questions")
const { getItemByIdJson, getItemByTextJson } = require("../utils")

const router = express.Router()

router.post("/get-by-text", (req, res) => {
	const { searchText } = req.body

	res.json({
		success: true,
		results: getItemByTextJson(questions, searchText),
	})
})

router.post("/get-by-id", (req, res) => {
	const { id } = req.body

	res.json({
		success: true,
		results: getItemByIdJson(questions, id)
	})
})

router.post("/add", (req, res) => {
	res.json({ success: false, })
})

module.exports = router

