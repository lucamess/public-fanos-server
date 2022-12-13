const express = require("express")
const user = require("../model/user-schema")

const router = express.Router()

router.post("/register", async (req, res) => {
	const { name, email, googleId } = req.body

	const checkedUser = await user.findOne({ email })
	if(Boolean(checkedUser) == false) {
		const newUser = new user({ name, email, googleId })
		await newUser.save()
	} 
	
	res.json({ success: true })

})

module.exports = router
