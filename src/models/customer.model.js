'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema,
	autoIncrement = require('mongoose-auto-increment');

let connection = mongoose.createConnection('mongodb://localhost/moleculer-blog');

autoIncrement.initialize(connection);

let CustomerSchema = new Schema({
	username: {
		type: String,
		unique: true,
		index: true,
		lowercase: true,
		required: 'Please fill in a username',
		trim: true
	},
	password: {
		type: String,
		required: 'Please fill in a password'
	},
	fullName: {
		type: String,
		trim: true,
		default: ''
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		index: true,
		lowercase: true,
		required: 'Please fill in an email',
		validate: {
			validator: function (v) {
				const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(v);
			},
			message: props => `${props.value} is not a valid email!`
		},
	},
	phone: {
		type: String,
		validate: {
			validator: function (v) {
				return /[0]\d{9}/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		},
		required: [true, 'User phone number required']
	},
	avatar: {
		type: String
	}
}, {
	timestamps: true
});

// Add full-text search index
CustomerSchema.index({
	//"$**": "text"
	'fullName': 'text',
	'username': 'text'
});
CustomerSchema.plugin(autoIncrement.plugin, {model: 'Customers', startAt: 1});
module.exports = mongoose.model('Customers', CustomerSchema);
