require("dotenv").config();

const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();

// port
const PORT = process.env.PORT || 4000;

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
