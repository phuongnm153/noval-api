'use strict';

let mongoose = require('mongoose');
const { BOOKING_NEW } = require('../enums/constant.enum');
let Schema = mongoose.Schema;
let mongoose_delete = require('mongoose-delete'),
	autoIncrement = require('mongoose-auto-increment');

let connection = mongoose.createConnection(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

autoIncrement.initialize(connection);

let BookingSchema = new Schema(
	{
		bookingCode: {
			type: String,
			minlength: 6,
			maxlength: 6,
			required: 'Please fill booking code',
		},
		hotelId: {
			type: Number,
			index: true,
		},
		promotionId: {
			type: Number,
			index: true,
		},
		checkIn: {
			type: Date,
			index: true,
		},
		checkOut: {
			type: Date,
			index: true,
		},
		bookedAt: {
			type: Date,
			index: true,
			default: Date.now,
		},
		totalMoney: {
			type: Number,
			min: 0,
			required: 'Please fill total money',
		},
		paymentId: {
			type: Number,
		},
		customerId: {
			type: Number,
		},
		customerName: {
			type: String,
			trim: true,
			required: 'Please fill full name',
		},
		customerEmail: {
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
				message: (props) => `${props.value} is not a valid email!`,
			},
		},
		customerPhone: {
			type: String,
			trim: true,
			minlength: 10,
			maxlength: 10,
			required: 'Please fill in a phone',
		},
		customerAddress: {
			type: String,
			trim: true,
		},
		status: {
			type: Number,
			default: BOOKING_NEW,
			min: 0,
			max: 3,
		},
		invoiceCompanyName: {
			type: String,
			trim: true,
		},
		invoiceCompanyTax: {
			type: String,
			trim: true,
		},
		invoiceCompanyAddress: {
			type: String,
			trim: true,
		},
		invoiceReceiveAddress: {
			type: String,
			trim: true,
		},
		invoiceNote: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
);

// Add full-text search index
BookingSchema.index({
	//"$**": "text"
	fullName: 'text',
	username: 'text',
});
BookingSchema.plugin(mongoose_delete);
BookingSchema.plugin(autoIncrement.plugin, { model: 'Bookings', startAt: 1 });
module.exports = mongoose.model('Bookings', BookingSchema);
