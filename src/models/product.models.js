import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,   
    trim: true 
  },
  price: { 
    type: Number, 
    required: true,   
    min: 0 
  },
  description: { 
    type: String,    
    default: "" 
  },
  
},
{ timestamps: true }
);

// Tạo model (collection trong DB sẽ là "products")
const Product = mongoose.model("Product", productSchema);

export default Product;
