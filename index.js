/** @format */

const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const { PORT, RPSECRET, RPAPI } = process.env;
app.use(express());
app.use(express.static("./public"));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("hi");
// });

app.post("/order", async (req, res) => {
  const amount = req.body.amount;

  var instance = new Razorpay({
    key_id: process.env.RPAPI,
    key_secret: process.env.RPSECRET,
    // this needs to go in .env
  });

  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  //   instance.orders.create(options, function (err, order) {
  //     console.log(order);
  //   });

  const myOrder = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    amount,
    order: myOrder,
  });
});
app.listen(PORT, console.log("Server is running on port 4000"));
