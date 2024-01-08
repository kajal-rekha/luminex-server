const express = require("express");
const Stripe = require("stripe");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/checkout-success",
    cancel_url: "http://localhost:3000/cart",
  });

 console.log("Stripe Session:", session);
 res.send({ url: session.url });

});


module.exports = router;
