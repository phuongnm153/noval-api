'use strict';

let mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const { BOOKING_NEW, PAYMENT_POINT } = require('../enums/constant.enum');
let Schema = mongoose.Schema;

let connection = mongoose.createConnection(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

autoIncrement.initialize(connection);

let PaymentSchema = new Schema(
	{
		bookingId: {
			type: Number,
			unique: true,
			index: true,
		},
		paymentMethod: {
			type: Number,
			default: PAYMENT_POINT,
		},
		totalMoney: {
			type: Number,
			min: 0,
		},
		point: {
			type: Number,
			min: 0,
		},
		transactionId: {
			type: String,
			unique: true,
			index: true,
			trim: true,
		},
		paymentAt: {
			type: Date,
			default: new Date(),
		},
		requestData: {
			type: String,
			trim: true,
		},
		responseData: {
			type: String,
			trim: true,
		},
		paymentUrl: {
			type: String,
			trim: true,
		},
		status: {
			type: Number,
			default: BOOKING_NEW,
			min: 0,
			max: 3,
		},
	},
	{
		timestamps: true,
	},
);

// Add full-text search index
PaymentSchema.index({
	//"$**": "text"
	fullName: 'text',
	username: 'text',
});

PaymentSchema.plugin(autoIncrement.plugin, { model: 'Payments', startAt: 1 });

//Add some comment
module.exports = mongoose.model('Payments', PaymentSchema);
