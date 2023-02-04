const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "FIELD_MISSING"],
	},
	email: {
		type: String,
		required: [true, "FIELD_MISSING"],
	},
	googleId: {
		type: String,
		required: [true, "FIELD_MISSING"],
	},
	type: {
		type: String,
		required: [true, "FIELD_MISSING"],
	},
})

module.exports = mongoose.model("User", userSchema)

