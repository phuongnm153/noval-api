'use strict';

const { MoleculerError } = require('moleculer').Errors;
const DbService = require('moleculer-db');
const MongooseAdapter = require('moleculer-db-adapter-mongoose');
const Payment = require('../models/payment.model');
const {PAYMENT_POINT, PAYMENT_GATEWAY, PAYMENT_SUCCESS, PAYMENT_FAIL} = require('../enums/constant.enum');
// const CacheCleaner = require("../mixins/cache.cleaner.mixin");

module.exports = {
	name: 'payments',
	mixins: [DbService],
	adapter: new MongooseAdapter(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }),
	model: Payment,

	settings: {
		fields: [
			'_id', 'bookingId', 'paymentMethod', 'totalMoney', 'point', 'status',
			'transactionId', 'paymentAt', 'requestData', 'responseData', 'paymentUrl'
		],
		// Populating
		populates: {
			// Populate the `author` field from `users` service
			bookingInfo: {
				action: 'bookings.get',
				params: {
					fields: ['bookingCode', 'totalMoney']
				}
			}
		}
	},

	actions: {
		/**
		 * paymentByNovaIDPoint
		 */
		paymentByNovaIDPoint: {
			rest: 'POST /paymentByNovaIDPoint',
			// params: {
			// 	id: 'string',
			// 	value: 'number|integer|positive'
			// },
			/** @param {Context} ctx  */
			async handler(ctx) {
				let random_boolean = Math.random() < 0.5;
				let data = {
					...ctx.params,
					paymentMethod: PAYMENT_POINT,
					// paymentAt: new Date(),
					status: random_boolean ? PAYMENT_SUCCESS : PAYMENT_FAIL,
				};
				const json = await this.adapter.insert(data);
				if (!random_boolean)
					return this.Promise.reject(new MoleculerError('Invalid point amount', 404, 'INVALID_POINT'));

				return json;
			}
		},

		/**
		 * paymentByPaymentGateway
		 */
		paymentByPaymentGateway: {
			rest: 'POST /paymentByPaymentGateway',
			// params: {
			// 	id: 'string',
			// 	value: 'number|integer|positive'
			// },
			/** @param {Context} ctx  */
			async handler(ctx) {
				let random_boolean = Math.random() < 0.5;
				let data = {
					...ctx.params,
					paymentMethod: PAYMENT_GATEWAY,
					// paymentAt: new Date(),
					status: random_boolean ? PAYMENT_SUCCESS : PAYMENT_FAIL,
				};
				const json = await this.adapter.insert(data);
				if (!random_boolean)
					return this.Promise.reject(new MoleculerError('Payment fail', 404, 'PAYMENT_FAIL'));

				return json;
			},
		}
	},

	methods: {
	},

	async afterConnected() {
	}

};
