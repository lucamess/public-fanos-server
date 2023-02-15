const removeWordNoice = text =>
	[" ", ".", ",", ")", "("].reduce((prev, curr) => prev.replace(curr, ""), text)

const getByText = (schema, searchText, page, limit) => {
	return schema.paginate({
		$text: {
			$search: searchText,
		}
	}, { page, limit })
		.then(data => {
			return data.docs
		})
}

const getById = (schema, id) => {
	return schema.findOne({ _id: id })
}

const getAll = (schema, page, limit) => {
	return schema.paginate({}, { page, limit })
		.then(data => {
			return data.docs
		})
}

const checkUserIsTeam = async (userSchema, user) => {
	const checkedUser = await userSchema.findOne({ email: user.email })
	console.log("checkUserIsTeam", checkedUser, checkedUser["type"])
	
	return Boolean(checkedUser?.type == "team")
}

const checkUserExists = async(userSchema, user) => {
	const checkedUser = await userSchema.findOne({ email: user.email })

	return Boolean(checkedUser)
}

const extractErrorList = errors => {
	const errorMessages = []
	Object.keys(errors).map(key => {
		errorMessages.push(errors[key].message)
	})

	return errorMessages
}

const getAndMergeKey = (key, obj) => {
	if(Boolean(obj[key]) == false)
		return ""

	return obj[key]["am"] + " " + obj[key]["en"]
}

const doesTextExist = (content, searchText) => {
	let doesExist = false

	searchText.split(" ").forEach(keyword => {
		if(content.indexOf(keyword) != -1)
			doesExist = true
	})

	return doesExist
}

const getItemByTextJson = (arr, searchText) => {
	const results = []

	arr.forEach(item => {
		const text = getAndMergeKey("title", item) + " " + getAndMergeKey("content", item)
		if(doesTextExist(text, searchText))
			results.push(item)
	})

	return results
}

const getItemByIdJson = (arr, id) => {
	return arr.filter(item => item._id == id)[0]
}

module.exports = {
	removeWordNoice,
	getByText,
	getAll,
	getById,
	checkUserIsTeam,
	checkUserExists,
	extractErrorList,
	getItemByTextJson,
	getItemByIdJson,
}
