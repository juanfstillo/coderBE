import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.post("/", cartController.createCart);
router.get("/", cartController.getCarts);
router.get("/:cid", cartController.getCartById);
router.post("/:cid/products/:pid", cartController.addProductIntoCart);
router.put("/:cid/products/:pid", cartController.updateProductOnCart);
router.delete("/:cid", cartController.deleteCart);
router.delete("/:cid/products/:pid", cartController.deleteProdOfCart);

export default router;