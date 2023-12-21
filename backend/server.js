require("dotenv").config();
const express = require("express");
const productsRoutes = require("./routes/products");
const signupRoutes = require("./routes/userSignup");
const loginRoutes = require("./routes/userLogin");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//   console.log("path ", req.path, "method ", req.method);
//   next();
// });

app.use("/api/products", productsRoutes);
app.use("/api/user", signupRoutes);
app.use("/api/user", loginRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, (req, res) => {
      console.log(
        "db connection established & listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
