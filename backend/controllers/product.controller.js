import Product from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    console.log(`Error in getAllProducts controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image, category } = req.body;
  try {
    if (!name || !price || !image) {
      return res.status(400).json({ message: "All fields must be available" });
    }
    const uploadResponse = await cloudinary.uploader.upload(image);

    const newProduct = new Product({
      name,
      price,
      image: uploadResponse.secure_url,
      category,
    });

    await newProduct.save();

    res.status(201).json({ product: newProduct });
  } catch (error) {
    console.log(`Error in createProduct controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await cloudinary.uploader.destroy(
      product.image.split("/").pop().split(".")[0]
    );
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(`Error in deleteProduct controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { name, image, price } = req.body;
    const { productId } = req.params;

    if (!name && !image && !price) {
      return res
        .status(400)
        .json({ message: "One field at least must be available" });
    }

    const product = await Product.findById(productId);

    let uploadResponse = null;
    if (image && image !== product.image) {
      await cloudinary.uploader.destroy(
        product.image.split("/").pop().split(".")[0]
      );
      uploadResponse = await cloudinary.uploader.upload(image);
      product.image = uploadResponse.secure_url;
    }
    if (name) product.name = name;
    if (price) product.price = price;

    product.save();

    res.status(200).json({ product });
  } catch (error) {
    console.log(`Error in editProduct controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isFeatured = !product.isFeatured;
    await product.save();

    res.status(200).json({ product });
  } catch (error) {
    console.log(`Error in toggleFeaturedProduct controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category });

    res.status(200).json(products);
  } catch (error) {
    console.log(`Error in getProductsByCategory controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });

    res.status(200).json(products);
  } catch (error) {
    console.log(`Error in getAllProducts controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
