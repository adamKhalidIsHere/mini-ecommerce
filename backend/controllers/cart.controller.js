import Product from "../models/product.model.js";

export const getCartItems = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });

    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });

    res.json(cartItems);
  } catch (error) {
    console.log(`Error in getCartItems controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;
    const existingItem = user.cartItems.find(
      (item) => item._id.toString() === productId.toString()
    );

    if (!existingItem)
      return res.status(404).json({ message: "Product not found in cart" });

    user.cartItems = user.cartItems.filter(
      (item) => item._id.toString() !== productId.toString()
    );

    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log(`Error in removeFromCart controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = req.user;

    user.cartItems = [];

    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log(`Error in clearCart controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user;
    const product = await Product.findById(productId);
    if (quantity < 1) {
      res.status(400).json({message: "Quantity can't be less than 1"})
    }

    if (!product) return res.status(404).json({ message: "Product not found" });
    const existingItem = user.cartItems.find(
      (item) => item._id.toString() === productId.toString()
    );
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log(`Error in addToCart controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;
    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) => productId.toString() === item._id.toString()
    );

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item) => item._id.toString() !== productId.toString()
        );
      }
      existingItem.quantity = quantity;
      await user.save();
      res.status(200).json(user.cartItems);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(`Error in updateQuantity controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
