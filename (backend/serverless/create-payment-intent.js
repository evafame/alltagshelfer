// Node serverless example
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET);

module.exports = async (req, res) => {
  const { jobId, amount, currency = 'eur', helperConnectedAccountId } = req.body;
  // Create PaymentIntent: capture later after job completion OR create as destination charge
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    metadata: { jobId },
    // for destination transfer:
    // transfer_data: { destination: helperConnectedAccountId },
  });
  res.json({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id });
};
