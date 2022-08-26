const express = require('express');
const { addProductToCart, getCart, deleteCart } = require('../controller/cart.controler');
const { isMember} = require('../middlewares/authJwt');
const { verifyToken } = require('../middlewares/verifyToken');

const cartRouter = express.Router();

cartRouter.get('/:id', verifyToken, isMember, getCart);

cartRouter.post('/:id', verifyToken, isMember, addProductToCart);

cartRouter.delete('/:id', verifyToken, isMember, deleteCart );


module.exports = cartRouter;