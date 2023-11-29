require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();

// port
const port = process.env.PORT || 4000;

// middlewares
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

//

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
