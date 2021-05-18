'use strict';

const DbService = require('moleculer-db');
const MongooseAdapter = require('moleculer-db-adapter-mongoose');
const Customer = require('../models/customer.model');

/*
const bcrypt = require("bcrypt");
function hashPassword(password) {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, function (error, salt) {
			if (error) {
				return reject(error);
			}
			bcrypt.hash(password, salt, function (error, hashedPassword) {
				if (error) {
					return reject(error);
				}
				resolve(hashedPassword);
			});
		});
	});
}*/

module.exports = {
	name: 'customers',
	mixins: [DbService],
	adapter: new MongooseAdapter(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }),
	model: Customer,

	settings: {
		fields: ['_id', 'username', 'fullName', 'password', 'email', 'phone', 'address']
	},

	actions: {

	},

	methods: {
	},

	async afterConnected() {
	}

};
