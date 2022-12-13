const express = require("express")
const blog = require("../model/blog-schema")
const { removeWordNoice, getAll, getByText, extractErrorMessages } = require("../utils.js")

const router = express.Router()


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
		next({
			message: extractErrorMessages(error.errors)
		})
    }
});


module.exports = router

/*
router.route("/update/:id").post((req, res) => {
    try {
        blog.findById(req.params.id)
            .then(async updateblog => {
                    updateblog.blogtitle = req.body.blogtitle,
                    updateblog.blogcontent = req.body.blogcontent,
                    updateblog.blogwriter = req.body.blogwriter,
                
            
                await updateblog.save()
                    .then(result => res.json({updated: result}))  
                    .catch((err) => res.json({msg: err.message}))
            })
        
    } catch (error) {
		console.log(error)
    }
});

router.route("/delete/:id").post((req, res) => {
    try {
        blog.findByIdAndDelete(req.params.id)
            .then(() => {
				res.json({
					success: true,
				})
			})
        
    } catch (error) {
		console.log(error)
    }
});

*/


