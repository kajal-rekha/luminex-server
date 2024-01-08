const express = require("express");

const Stripe = require("stripe");

// require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();


router.post("/create-checkout-session", async (req, res) => {
  if (!req.body.cartItems || !Array.isArray(req.body.cartItems)) {
    return res.status(400).json({ error: "Invalid cartItems data" });
  }

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });

  console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collections: {
      allowed_countries: ["US", "CA", "BD"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collections: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    success_url: "http://localhost:3000/checkout-success",
    cancel_url: "http://localhost:3000/cart",
  });

  console.log("Stripe Session:", session);
  res.send({ url: session.url });
});

module.exports = router;
