import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true }, // Ensure the address object matches your frontend structure
    status: { type: String, default: "Pending" },
    isPaid: { type: Boolean, default: false },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false },
    // imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
