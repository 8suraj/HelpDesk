const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		fullName: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		isResolver: {
			type: Boolean,
			default: false,
		},
		tempNotification: {
			date: Date,
			notification: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Users', userSchema);
