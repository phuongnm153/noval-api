"use strict";

let mongoose = require("mongoose");
const {PAYMENT_NEW} = require("../enums/constant.enum");
let Schema = mongoose.Schema;

let PaymentSchema = new Schema({
	bookingId: {
		type: String,
		unique: true,
		index: true,
		trim: true
	},
	amount: {
		type: Number,
		min: 0
	},
	transactionId: {
		type: String,
		unique: true,
		index: true,
		trim: true
	},
	methodId: {
		type: String,
		index: true,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		index: true,
		lowercase: true,
		required: "Please fill in an email"
	},
	status: {
		type: Number,
		default: PAYMENT_NEW,
		min: 0,
		max: 3
	}
}, {
	timestamps: true
});

// Add full-text search index
PaymentSchema.index({
	//"$**": "text"
	"fullName": "text",
	"username": "text"
});

module.exports = mongoose.model("Payments", PaymentSchema);
