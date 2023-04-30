const Users = require('./user.mongo');
const { jwtGen } = require('../utils/utils');
const isUserEmailExists = async (email) => {
	const user = await Users.findOne(
		{ email: email.toLowerCase() },
		{ _id: 0, __v: 0 }
	).exec();
	if (user) return true;
	return false;
};
const isUserNameExists = async (username) => {
	const user = await Users.findOne(
		{ username: username.toLowerCase() },
		{ _id: 0, __v: 0 }
	).exec();
	if (user) return true;
	return false;
};
const createUser = async (data) => {
	const newUser = new Users(data);
	const user = await newUser.save();
	if (!user) return null;
	const token = jwtGen({
		id: user._id,
		isResolver: user.isResolver,
	});
	return token;
};
const verifyUser = async (data) => {
	const user = await Users.findOne({
		email: data.email.toLowerCase(),
	}).exec();
	if (!user) return null;
	if (user.password !== data.password) return null;

	const token = jwtGen({
		id: user._id,
		isResolver: user.isResolver,
		username: user.username,
		email: user.email,
	});
	return token;
};
const getUser = async (id) => {
	const user = await Users.findOne(
		{ _id: id },
		{ _id: 0, __v: 0 }
	);
	if (user) return user;
	return null;
};
module.exports = {
	isUserEmailExists,
	isUserNameExists,
	createUser,
	verifyUser,
	getUser,
};
