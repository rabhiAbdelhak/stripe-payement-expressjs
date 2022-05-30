require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);


const stripeController = async (req, res) => {
    const {purchase, total_amount, shipping_fee} = req.body;
    const calculateOrderAmount = () => {
        return (total_amount + shipping_fee)
    }
    console.log(process.env.STRIPE_KEY)
    const paymentIntent = await stripe.paymentIntents.create({
        amount : calculateOrderAmount(),
        currency : 'usd'
    });
    console.log(paymentIntent)
    res.status(200).json({clientSecret: paymentIntent.client_secret});
}

module.exports = {stripeController}