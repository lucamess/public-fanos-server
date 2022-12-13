const comment = require("../model/comment-schema")
const router = require("express").Router();
const { extractErrorMessages } = require("../utils")

router.post("/get-by-question-id", (req, res) => {
	const { questionId, page, limit } = req.body
	comment.paginate({
		questionId,
	}, { page, limit })
		.then(data => {
			res.json({
				success: true,
				results: data.docs,
			})
		})

})

router.post("/add", async (req, res, next) => {
	const { questionId, user, content, date } = req.body

	console.log("comment/add", req.body)

    try {
        const newComment = new comment({
			questionId, user, content, date
        })
    
        await newComment.save()
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
        comments.findById(req.params.id)
            .then(async updateblog => {

                updateblog.commentuser = req.body.commentuser,
                updateblog.commentcontext = req.body.commentcontext
                
            
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
        comments.findByIdAndDelete(req.params.id)
            .then(result => res.json({deleted: result}))
        
    } catch (error) {
		console.log(error)
    }
});
*/

