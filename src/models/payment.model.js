'use strict';

let mongoose = require('mongoose');
const {BOOKING_NEW, PAYMENT_POINT} = require('../enums/constant.enum');
let Schema = mongoose.Schema;

let PaymentSchema = new Schema({
	bookingId: {
		type: String,
		unique: true,
		index: true,
		trim: true
	},
	paymentMethod: {
		type: Number,
		default: PAYMENT_POINT
	},
	totalMoney: {
		type: Number,
		min: 0
	},
	point: {
		type: Number,
		min: 0
	},
	transactionId: {
		type: String,
		unique: true,
		index: true,
		trim: true
	},
	paymentAt: {
		type: Date,
		default: Date.now
	},
	requestData: {
		type: String,
		trim: true
	},
	responseData: {
		type: String,
		trim: true
	},
	paymentUrl: {
		type: String,
		trim: true
	},
	status: {
		type: Number,
		default: BOOKING_NEW,
		min: 0,
		max: 3
	}
}, {
	timestamps: true
});

// Add full-text search index
PaymentSchema.index({
	//"$**": "text"
	'fullName': 'text',
	'username': 'text'
});

module.exports = mongoose.model('Payments', PaymentSchema);
