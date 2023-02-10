const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2")
const userSchema = require("./user-schema")
const { checkUserExists } = require("../utils")

const commentSchema = mongoose.Schema({
	questionId: {
		type: String,
		required: [true, "FIELD_MISSING"],
	},
	user: {
		name:  {
			type: String,
			required: [true, "FIELD_MISSING"],
		},
		email: {
			type: String,
			required: [true, "FIELD_MISSING"],
			validate: {
				message: "USER_DOES_NOT_EXIST",
				validator: email => checkUserExists(userSchema, { email })
			}
		} ,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	content: {
		am: {
			type: String,
		},
		en: {
			type: String,
		}
	},
})

commentSchema.index({ content: "text" })
commentSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Comment", commentSchema)

