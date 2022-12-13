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

const getAll = (schema, page, limit) => {
	return schema.paginate({}, { page, limit })
		.then(data => {
			console.log(data)
			return data.docs
		})
}

const checkUserIsTeam = async (userSchema, user) => {
	const checkedUser = await userSchema.findOne({ email: user.email })
	
	return Boolean(checkedUser?.type == "team")
}

const checkUserExists = async(userSchema, user) => {
	const checkedUser = await userSchema.findOne({ email: user.email })

	return Boolean(checkedUser)
}

const extractErrorMessages = errors => {
	const errorMessages = []
	Object.keys(errors).map(key => {
		errorMessages.push(errors[key].message)
	})

	return errorMessages
}

module.exports = {
	removeWordNoice,
	getByText,
	getAll,
	checkUserIsTeam,
	checkUserExists,
	extractErrorMessages,
}
