import express from "express";
const router = express.Router();

import ProductManager from "../dao/controllers/products.js";

import CartManager from "../dao/controllers/carts.js";

import { uploader } from "../utils.js";

const pm = new ProductManager();
//nuevos métodos products
router.get('/products', async (req, res) => {
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
    console.log("Error while trying to obtain products",error);
    res.status(500).json({ error: "Internal server error" });
  }

});
router.get("/api/products", async (req, res) => {
  const category = req.query.category
  const products = await pm.getProducts();
    res.send({ status: "success", payload: products });
});

router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await pm.getProductById({ _id: pid });
  res.render('details', {
    product: product
  })
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
//crear un carrito
router.post("/api/cart", async (req, res) => {
  try {
    const cart = new CartManager();
    const newCart = await cart.createCart();
    res.send({ status: "success", payload: newCart });
  } catch (error) {
    console.error("Errror trying to create a cart:", error);
    res.status(500).json({ error: "Error trying to create a cart" });
  }
});
//obtener todos los carritos
router.get("/api/carts", async (req, res) => {
  try {
    const cart = new CartManager();
    const carts = await cart.getCarts();
    res.send({ status: "success", payload: carts });
  }catch (error) {
    console.error("Errror trying to get carts:", error);
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

router.post("/api/cart/:cid/products/:pid", async (req, res) => {
  const cId = req.params.cid;
  const pId = req.params.pid;
  const quantity = req.body
  const cart = new CartManager();
  try {
    const cartUpdate = await cart.addProductCart(cId, pId,quantity.quantity);
    if (cartUpdate) {
      res.send({ status: "success", payload: cartUpdate });
    } else {
      res
        .status(500)
        .json({ error: "Error trying to add a product to a cart" });
    }
  } catch (error) {
    res
      .status(500)
      .send(`There was a error trying to add a product to your cart ${error}`);
  }
});

router.get("/chat", (req, res) => {
  res.render("chat");
});



export default router;
