import express from "express";
const router = express.Router();

import ProductManager from "../dao/controllers/products.js";

import CartManager from "../dao/controllers/carts.js";

import { uploader } from "../utils.js";

const pm = new ProductManager();
const cart = new CartManager();

//nuevos métodos products
router.get("/products", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const sort = req.query.sort;
    const category = req.query.category;
    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
      await pm.getProducts(page, sort, category);
    const products = docs;
    res.render("index", {
      products: products,
      page: rest.page,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
    });
  } catch (error) {
    console.log("Error while trying to obtain products", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/api/products", async (req, res) => {
  const category = req.query.category;
  const products = await pm.getProducts();
  res.send({ status: "success", payload: products });
});

router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await pm.getProductById({ _id: pid });
  res.render("details", {
    product: product,
  });
});

//nuevos métodos products fin

router.get("/products/create", (req, res) => {
  res.render("create");
});

router.post("/products/create", uploader.single("thumbnails"), (req, res) => {
  const { title, description, code, price, stock } = req.body;
  const filename = req.file.filename;

  if (!title || !description || !code || !price || !stock || !filename)
    return res.status(400).send({ error: "Incomplete values" });

  let product = {
    title,
    description,
    code,
    price,
    stock,
    thumbnails: filename,
  };

  const pm = new ProductManager();
  pm.createProduct(product);
  res.status(200).send({ success: "Product created" });
});

router.get("/products/:id", async (req, res) => {
  const pId = req.params.id;
  const pm = new ProductManager();
  const product = await pm.getProductById(pId);
  if (product) {
    res.status(200).json(product);
  } else {
    const error = { error: "Producto not found" };
    return res.status(404).send(error);
  }
});

router.delete("/products/:id", async (req, res) => {
  const pId = req.params.id;
  const pm = new ProductManager();
  const product = await pm.deleteProduct(pId);
  if (product) {
    res.status(200).send({ success: "Product deleted" });
  } else {
    const error = { error: "Producto not found" };
    return res.status(404).send(error);
  }
});

router.put("/products/:id", async (req, res) => {
  const pId = req.params.id;
  const { body } = req;
  const pm = new ProductManager();
  const product = await pm.updateProduct(pId, body);
  if (product) {
    res.status(200).send(`Product with the id ${pId} uploaded`);
  } else {
    const error = { error: "Producto not found" };
    return res.status(404).send(error);
  }
});

//CART**
//nuevos métodos carrito

//crear un carrito
router.post("/api/cart", async (req, res) => {
  try {
    const cart = new CartManager();
    const newCart = await cart.createCart();
    res.send({ status: "success", payload: newCart });
  } catch (error) {
    console.error("Error trying to create a cart:", error);
    res.status(500).json({ error: "Error trying to create a cart" });
  }
});

//obtener todos los carritos
router.get("/api/carts", async (req, res) => {
  try {
    const cart = new CartManager();
    const carts = await cart.getCarts();
    res.send({ status: "success", payload: carts });
  } catch (error) {
    console.error("Error trying to get carts:", error);
    res.status(500).json({ error: "Error trying to get carts" });
  }
});

//obtener un carrito por su id
router.get("/api/cart/:id", async (req, res) => {
  const cId = req.params.id;
  const cart = new CartManager();
  const cartFound = await cart.getCartById(cId);
  if (cartFound) {
    res.status(200).json(cartFound);
  } else {
    const error = { error: "Cart not found" };
    return res.status(404).send(error);
  }
});

//actualizar solo cantidad
router.put("/api/carts/:cid", async (req, res) => {
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

// vista de un carrito
router.get("/carts/:cId", async (req, res) => {
  const { cId } = req.params;
  const cartFound = await cart.getCartById(cId);
  res.render("cart", {
    products: cartFound.products,
  });
});

// borrar todos los productos de un carrito
router.delete("/api/carts/:cId", async (req, res) => {
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

//borrar algunos productos del carrito
router.delete("/api/carts/:cId/products/:pId", async (req, res) => {
  const cId = req.params.cId;
  const pId = req.params.pId;
  const quantity = req.body;
  const cartFound = await cart.deleteProductInCart({ _id: cId }, { _id: pId });
  res.send({ status: "success", message: cartFound });
});

//fin nuevos métodos carrito

router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
