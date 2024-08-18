const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//const Auth = require("../middlewares/auth");
require("dotenv").config();

const successURL =
  process.env.CLIENT_SUCCESS_URL === "https://luminex-lux.vercel.app"
    ? "https://luminex-lux.vercel.app"
    : "https://luminex-lux.vercel.app/checkout-success";
const cancelURL =
    process.env.CLIENT_CANCEL_URL === "https://luminex-lux.vercel.app"
        ? "https://luminex-lux.vercel.app"
        : "https://luminex-lux.vercel.app/cart";

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
          name: item.title,
          images: [item.images[0]],
          description: item.description,
          metadata: {
            id: item._id,
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
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
