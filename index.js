require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const stripeRoutes = require("./routes/stripeRoutes");

// express app
const app = express();

// port
const port = process.env.PORT || 4000;

// middlewares
app.use(
    cors({
        credentials: true
    })
);
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// test api
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the luminex server!" });
});

// BYPASS API
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));

// mongodb
mongoose.set("strictQuery", false);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // listen to server
        app.listen(port, () => {
            console.log(`connected to mongo and listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });
