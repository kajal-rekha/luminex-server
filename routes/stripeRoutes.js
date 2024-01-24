const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
//const Auth = require("../middlewares/auth");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const successURL =
  process.env.CLIENT_SUCCESS_URL === "https://luminex-lux.vercel.app"
    ? "https://luminex-lux.vercel.app"
    : "http://localhost:3000/checkout-success";
const cancelURL =
  process.env.CLIENT_CANCEL_URL === "https://luminex-lux.vercel.app"
    ? "https://luminex-lux.vercel.app"
    : "http://localhost:3000/cart";

const router = express.Router();

router.post("/create-checkout-session", cors(), async (req, res) => {
  //res.json({ message: "hello" });
  const { data } = req.body;
  console.log(req.body.data);
  if (!req.body.data || !Array.isArray(req.body.data)) {
    res.status(400).json({ error: "Invalid cartItems data" });
    return;
  }

  console.log(req.body.userId);
  const line_items = req.body.data.map((item) => {
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

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: successURL,
      cancel_url: cancelURL,
    });

    console.log("Stripe Session:", session);
    res.send({ url: session.url });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
