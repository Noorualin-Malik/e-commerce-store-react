import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true, // ✅ fixed typo: require → required
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true, // ✅ ensure linked user is always present
  },
  price: {
    type: Number, // ✅ price should be a number, not a string
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  }
}, {
  timestamps: true, // ✅ optional: adds createdAt and updatedAt fields
});

const Product = mongoose.model("Product", productSchema);
export default Product;
