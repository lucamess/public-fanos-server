const express = require("express")
const blogs = require("./db-demo/blogs")
const { getItemByIdJson, getItemByTextJson } = require("../utils")

const router = express.Router()

router.post("/get-by-id", (req, res) => {
	const { id } = req.body

	res.json({
		success: true,
		results: getItemByIdJson(blogs, id),
	})
})

router.post("/get-by-text", (req, res) => {
	const { searchText } = req.body

	res.json({
		success: true,
		results: getItemByTextJson(blogs, searchText),
	})
})

router.post("/add", (req, res) => {
	res.json({ success: false, })
})

module.exports = router

