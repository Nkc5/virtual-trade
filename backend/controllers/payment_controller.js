// controllers/paymentController.js
const stripe = require('../config/stripe');

exports.createPayment = async (req, res) => {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({ amount: amount * 100, currency: 'usd' });
    res.json({ clientSecret: paymentIntent.client_secret });
};