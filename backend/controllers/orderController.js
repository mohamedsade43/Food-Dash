import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
// import dotenv from "dotenv";
// dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing User Order for Frontend
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || !amount || !address) {
      // Log each field to check if they are received correctly
      // console.log("userId:", userId);
      // console.log("items:", items);
      // console.log("amount:", amount);
      // console.log("address:", address);

      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Note: Stripe expects amount in smallest currency unit
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 500, // Example: 500 paise = 5 INR
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
      line_items: line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Error in placeOrder:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

// Listing Orders for Admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Error in listOrders:", error);
    res.status(500).json({ success: false, message: "Error listing orders" });
  }
};

// User Orders for Frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Error in userOrders:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user orders" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log("Error in updateStatus:", error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment verified" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment not verified" });
    }
  } catch (error) {
    console.log("Error in verifyOrder:", error);
    res
      .status(500)
      .json({ success: false, message: "Error verifying payment" });
  }
};

export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder };
