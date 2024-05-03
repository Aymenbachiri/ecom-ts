import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageurl: { type: String, required: true },
    oldprice: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
