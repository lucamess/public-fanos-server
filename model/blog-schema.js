const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2")
const { checkUserIsTeam } = require("../utils")
const userSchema = require("./user-schema")

const blogSchema = mongoose.Schema({
	user: {
		name: {
			type: String,
			required: [true, "FIELD_MISSING"],
		},
		email: {
			type: String,
			required: [true, "FIELD_MISSING"],
			validate: {
				message: "TEAM_ONLY",
				validator: email => checkUserIsTeam(userSchema, { email })
			}
		},
	},
    title: {
		type: String,
		required: [true, "FIELD_MISSING"],
	},
	content: {
		am: {
			type: String,
		},
		en: {
			type: String,
		}
	},
	date: {
		type: Date,
		default: Date.now,
	},
	imgSrc: {
		type: String,
		required: [true, "FIELD_MISSING"],
	},
})

blogSchema.index({ title: "text", content: "text" })
blogSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Blog", blogSchema)
