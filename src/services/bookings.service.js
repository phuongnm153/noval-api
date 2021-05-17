'use strict';

const DbService = require('moleculer-db');
const MongooseAdapter = require('moleculer-db-adapter-mongoose');
const Booking = require('../models/booking.model');

module.exports = {
	name: 'bookings',
	mixins: [DbService],
	adapter: new MongooseAdapter(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }),
	model: Booking,

	settings: {
		fields: [
			'_id', 'bookingCode', 'hotelId', 'promotionId', 'checkIn', 'checkOut', 'bookedAt',
			'totalMoney', 'totalPoint', 'status', 'bookInfo', 'promotionInfo', 'voucherCode',
			'paymentId', 'paymentAt', 'successAt', 'failAt', 'failType',
			'customerId', 'customerName', 'customerEmail', 'customerPhone', 'customerAddress',
			'invoiceCompanyName', 'invoiceCompanyTax', 'invoiceCompanyAddress', 'invoiceReceiveAddress', 'invoiceNote',
			'deletedAt'
		]
	},

	actions: {

	},

	methods: {
	},

	async afterConnected() {
	}

};
