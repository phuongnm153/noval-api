'use strict';

const _ = require('lodash');
const DbMixin = require('../../mixins/db.mixin');
const Booking = require('../models/booking.model');

module.exports = {
	name: 'bookings',
	mixins: [DbMixin('bookings')],
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
