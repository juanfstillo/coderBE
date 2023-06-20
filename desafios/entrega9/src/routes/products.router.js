import express from "express";
const router = express.Router();
import ProductManager from "../dao/controllers/products.js";

import { uploader } from "../utils.js";

const pm = new ProductManager();

router.get("/", async (req, res) => {
  const category = req.query.category;
  const products = await pm.getProducts();
  res.send({ status: "success", payload: products });
});

router.get("/:id", async (req, res) => {
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

router.post("/create", uploader.single("thumbnails"), (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

export default router;