import express from "express";
const router = express.Router();
import ProductManager from "../dao/controllers/products.js";
import CartManager from "../dao/controllers/carts.js";
import { privacy } from "../middlewares/auth.js";
import bodyParser from "body-parser";

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const pm = new ProductManager();
const cart = new CartManager();

//PRODUCT
//vista products
router.get("/", async (req, res) => {
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

router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await pm.getProductById({ _id: pid });
  res.render("details", {
    product: product,
  });
});

router.get("/products/create", (req, res) => {
  res.render("create");
});

//CART
router.get("/carts/:cId", async (req, res) => {
  const { cId } = req.params;
  const cartFound = await cart.getCartById(cId);
  res.render("cart", {
    products: cartFound.products,
  });
});

//CHAT
router.get("/chat", (req, res) => {
  res.render("chat");
});

//USER
router.get("/register", privacy('NO_AUTH'), async (req, res) => {
  res.render("register");
});

router.get("/login", privacy('NO_AUTH'), async (req, res) => {
  res.render("login");
});

router.get('/logout', privacy('USER'), async (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login')
  });
})

export default router;
