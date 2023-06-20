import express from "express";
const router = express.Router();
import ProductManager from "../dao/controllers/products.js";
import CartManager from "../dao/controllers/carts.js";
import { privacy } from "../middlewares/auth.js";

// import para login
import session from "express-session";
import { registerUser, authenticateUser } from "../dao/controllers/user.js";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import { logoutUser } from "../dao/controllers/user.js";

// Configuración de la sesión y almacenamiento en MongoDB
const sessionStore = MongoStore.create({
  mongoUrl: `mongodb+srv://juanstillo:abc123abc123@ecommerce.ywig996.mongodb.net/?retryWrites=true&w=majority`,
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(
  session({
    secret: "abc123abc123", // Cambia esto a una clave secreta más segura
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

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
// vista de un carrito
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

//metodos user

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(
  session({
    secret: "abc123abc123", // Cambia esto a una clave secreta más segura
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, password, age } = req.body;

  if (!first_name || !last_name || !email || !password || !age) {
    return res.status(400).send("Incomplete values");
  }
  try {
    // Registrar al usuario
    await registerUser(req.body, res);
  } catch (error) {
    console.error("Error trying to register a user", error);
    res.status(500).send("Error trying to register a user");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Autenticacion del usuario y obtencion de los datos
    const userData = await authenticateUser(email, password);

    // Guardado de los datos del usuario en la session.
    req.session.user = userData;

    res.redirect("/products");
  } catch (error) {
    res.render("login", { error: error.message });
  }
});

router.get("/logout", logoutUser);

export default router;
