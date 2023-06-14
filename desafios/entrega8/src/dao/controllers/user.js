import bcrypt from "bcrypt";
import User from "../models/user.js";

export const registerUser = async (userData, res) => {
  try {
    const { first_name, last_name, email, age, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });

    await newUser.save();

    res.redirect("/login");
  } catch (error) {
    console.error("Error al registrar al usuario:", error);
    res.status(500).json({ error: "Error al registrar al usuario" });
  }
};

export const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Correo electrónico no registrado");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return {
    first_name: user.first_name,
    last_name: user.last_name,
    age: user.age,
    email: user.email,
  };
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Autenticacion del usuario y obtencion de los datos
    const userData = await authenticateUser(email, password);

    // Crear sesión de usuario
    req.session.user = userData;

    res.redirect("/products"); // Redireccionar al listado de productos
  } catch (error) {
    console.error("Error trying to init session", error);
    res
      .status(400)
      .render("login", { error: "User or pass incorrect" });
  }
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error trying to log out:", err);
      res.status(500).send("Error trying to log out");
    } else {
      res.redirect("/login");
    }
  });
};
