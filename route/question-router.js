const question = require("../model/question-schema")
const router = require("express").Router()
const { removeWordNoice, getAll, getById, getByText, } = require("../utils.js")


router.post("/get-by-id", (req, res) => {
	const { id } = req.body
	getById(question, id)
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
		getAll(question, page, limit)
			.then(data => {
				res.json({
					success: true,
					results: data,
				})
			})
	} else {
		getByText(question, searchText, page, limit)
			.then(data => {
				res.json({
					success: true,
					results: data,
				})
			})
	}
});

router.post("/add", async (req, res, next) => {
	const { user, title, content, date, tag } = req.body

    try {
        const newBlog = new question({
			user, title, content, date, tag
        })

        await newBlog.save()
        res.json({ success: true })
        
    } catch (error) {
		next({
			message: error.message
		})
    }
})

module.exports = router
