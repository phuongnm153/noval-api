'use strict';

const _ = require('lodash');
const DbMixin = require('../../mixins/db.mixin');
const Customer = require('../models/customer.model');
// const CacheCleaner = require("../mixins/cache.cleaner.mixin");

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
	mixins: [DbMixin('customers')],
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
