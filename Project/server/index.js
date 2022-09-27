const express = require("express");
const app = express();
const cors = require("cors");
/********Stripe Stuff********/
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
/********Stripe Stuff********/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./models");

// Routers
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const menuRouter = require("./routes/Menuitems");
app.use("/menu", menuRouter);

const categoryRouter = require("./routes/Categories");
app.use("/categories", categoryRouter);

const favRouter = require("./routes/Favorites");
app.use("/fav", favRouter);

const cartitemsRouter = require("./routes/Cartitems");
app.use("/cart", cartitemsRouter);

// const paymentRouter = require("./routes/Payment");
// app.use("/payment", paymentRouter);

// const checkoutRouter = require("./routes/Checkout");
// app.use("/checkout", checkoutRouter);

/********Stripe Payment Route********/
app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "CAD",
      description: "The Resto order",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
