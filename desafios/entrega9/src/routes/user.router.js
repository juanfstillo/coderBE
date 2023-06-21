import { Router, response } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/registerFail",
    failureMessage: true,
  }),
  async (req, res) => {
    res.send({ status: "success", message: "Registered" });
  }
);

router.get("/registerFail", (req, res) => {
  console.log(req.session.message);
  res.status(400).send({ status: "error", error: req.session.message });
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/loginFail",
    failureMessage: true,
  }),
  async (req, res) => {
    req.session.user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    };
    if (req.session.user.role === "admin") {
      res.send({ status: "success", message: "Admin is loged" });
    } else {
      res.send({ status: "success" });
    }
  }
);

router.get("/loginFail", (req, res) => {
  res.status(400).send({
    status: "error",
    error: req.session.messages[req.session.messages.length - 1],
  });
});

router.get("/github", passport.authenticate("github"), (req, res) => {});

router.get("/githubcallback", passport.authenticate("github"), (req, res) => {
  const user = req.user;
  console.log(user);

  req.session.user = {
    id: user._id,
    name: user.first_name,
    email: user.email,
    role: user.role,
  };

  res.send({ status: "success" });
});

export default router;
