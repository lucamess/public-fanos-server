const express = require("express")
const blog = require("../model/blog-schema")
const { removeWordNoice, getAll, getByText, getById, extractErrorList } = require("../utils.js")

const router = express.Router()

router.post("/get-by-id", (req, res) => {
	const { id } = req.body
	getById(blog, id)
		.then(data => {
			res.json({
				success: true,
				results: data,
			})
		})

})

router.post("/get-by-text", (req, res) => {
	const { searchText, page, limit } = req.body

	if(removeWordNoice(searchText) == "") {
		getAll(blog, page, limit)
			.then(data => {
				res.json({
					success: true,
					results: data,
				})
			})
	} else {
		getByText(blog, searchText, page, limit)
			.then(data => {
				res.json({
					success: true,
					results: data,
				})
			})
	}

});

router.post("/add", async (req, res, next) => {
	const { user, title, content, imgSrc, date } = req.body

    try {
        const newBlog = new blog({
			user, title, content, imgSrc, date
        })

        await newBlog.save()
        res.json({ success: true })
        
    } catch (error) {
		console.log("[-] error in blog/add", error.message, req.body)
		next({
			message: error.message,
			errorList: extractErrorList(error.errors)
		})
    }
});


module.exports = router


