require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");


// express app
const app = express();

// port
const port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// test api
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the luminex server!" });
});

// BYPASS API
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

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
