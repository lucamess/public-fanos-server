const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2")
const userSchema = require("./user-schema")
const { checkUserExists } = require("../utils")

const questionSchema = mongoose.Schema({
	user: {
		name: {
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
		},
	},
	title: {
		am: {
			type: String,
		},
		en: {
			type: String,
		}
	},
	content: {
		am: {
			type: String,
		},
		en: {
			type: String,
		}
	},
	tag: {
		type: String,
		required: [true, "FIELD_MISSING"],
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

questionSchema.index({ title: "text", content: "text" })
questionSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Question", questionSchema)
