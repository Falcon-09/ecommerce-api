const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Stripe API

exports.paymentHandler = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
    },
    (err, stripeRes) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(stripeRes);
    }
  );
};
