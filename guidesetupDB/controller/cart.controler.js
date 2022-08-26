const { User } = require('../models/db.model');
const db = require('../models/db.model');
const UserModel = db.User;
const ProductModel = db.Product;
const CartModel = db.Cart;

const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    await CartModel.destroy({
      where: {
        id: cartId,
      }
    });

    return res.status(200).json({ message: "Delete Cart Successfully!" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getCart = async (req, res) => {
  const {id} = req.params;
  try {

    const carts = await CartModel.findAll({
      where: {
        userId: id
      },
      include: [{model: ProductModel, as: "product"}, {model: UserModel, as: "user"}],
      raw: true,
    },
    )
    const arr = [];

    carts.map((e) => {
      const obj = {
        id: e.id,
        productId: e["product.id"],
        title: e["product.title"],
        price: e["product.price"],
        size: e["product.size"],
        description: e["product.description"],
        image: e["product.image"],
        username: e["user.username"],
        email: e["user.email"],
      }
      arr.push(obj)
    })

    return res.status(200).json(arr);
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
const addProductToCart = async (req, res) => {
    const { id } = req.params;
    const {idProduct} = req.body;
    const data = {
      userId: id,
      productId: idProduct
    }
    try {
      const foundProduct = await CartModel.findOne({
        where: {
          productId: idProduct,
          userId: id
        }
      });

      if (foundProduct) {
        return res.status(401).json({message: "Product is exist in cart!"})
      }

      await CartModel.create(data)
      return res.status(201).json({message: "Add to cart successfully!"})
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
}
module.exports = { 
  getCart, 
  addProductToCart, 
  deleteCart,  
};