"use strict";

const _ = require("lodash");
const DbMixin = require("../../mixins/db.mixin");

module.exports = {
	name: "bookings",
	mixins: [DbMixin("bookings")],

	settings: {
		fields: [
			"_id", "bookingCode", "hotelId", "promotionId", "checkIn", "checkOut", "bookedAt",
			"totalMoney", "totalPoint", "status", "bookInfo", "promotionInfo", "voucherCode",
			"paymentId", "paymentAt", "successAt", "failAt", "failType",
			"customerId", "customerName", "customerEmail", "customerPhone", "customerAddress",
			"invoiceCompany", "invoiceTax", "invoiceCompanyAddress", "invoiceReceiveAddress", "invoiceNote",
			"deletedAt"
		]
	},

	actions: {

	},

	methods: {
	},

	async afterConnected() {
	}

};
