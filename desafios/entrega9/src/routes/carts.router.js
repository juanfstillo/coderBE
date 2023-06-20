import express from "express";
const router = express.Router();
import CartManager from "../dao/controllers/carts.js";

const cart = new CartManager();

router.post("/", async (req, res) => {
  try {
    const cart = new CartManager();
    const newCart = await cart.createCart();
    res.send({ status: "success", payload: newCart });
  } catch (error) {
    console.error("Error trying to create a cart:", error);
    res.status(500).json({ error: "Error trying to create a cart" });
  }
});

router.get("/", async (req, res) => {
  try {
    const cart = new CartManager();
    const carts = await cart.getCarts();
    res.send({ status: "success", payload: carts });
  } catch (error) {
    console.error("Error trying to get carts:", error);
    res.status(500).json({ error: "Error trying to get carts" });
  }
});

router.get("/:id", async (req, res) => {
  const cId = req.params.id;
  const cartFound = await cart.getCartById(cId);
  if (cartFound) {
    res.status(200).json(cartFound);
  } else {
    const error = { error: "Cart not found" };
    return res.status(404).send(error);
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cId = req.params.cid;
  const pId = req.params.pid;
  const quantity = req.body.quantity || 1;
  const cart = new CartManager();
  try {
    const cartUpdate = await cart.updateCart(cId, pId, quantity);
    if (cartUpdate) {
      res.send({ status: "success", payload: cartUpdate });
    } else {
      res.status(500).json({ error: "Error trying to edit a product in cart" });
    }
  } catch (error) {
    res
      .status(500)
      .send(`There was a error trying to edit a product to your cart ${error}`);
  }
});

router.delete("/:cId", async (req, res) => {
  try {
    const { cId } = req.params;
    const cartDeleted = await cart.deleteAllProductsCart(cId);
    if (!cartDeleted) {
      res.send({
        status: "error",
        message: `Cart with the id ${cId} not found, try again-`,
      });
    } else {
      res.send({
        status: "success",
        message: `Products in cart ${cId} deleted successfully`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error trying to delete all products in cart ${cId} ` });
  }
});

router.delete("/:cId/products/:pId", async (req, res) => {
  const cId = req.params.cId;
  const pId = req.params.pId;
  const quantity = req.body;
  const cartFound = await cart.deleteProductInCart({ _id: cId }, { _id: pId });
  res.send({ status: "success", message: cartFound });
});

export default router;
