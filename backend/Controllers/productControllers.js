import Product from '../model/product.js';

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const file = req.file;
    const user = req.user;

    if (!file || !user) {
      return res.status(400).json({ message: 'Missing file or user information' });
    }

    const { product_name, price, description } = req.body;

    const newProduct = new Product({
      product_name,
      price,
      description,
      user_id: user._id,
      image: file.filename,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('user_id', 'name email'); // populate only necessary fields
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
