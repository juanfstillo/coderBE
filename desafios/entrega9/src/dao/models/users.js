import mongoose from "mongoose";
import bcrypt from "bcrypt";

const collection = "users";

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  age: { type: Number },
  password: { type: String },
  role: { type: String, default: 'user'},
  });

// userSchema.methods.comparePassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const userModel = mongoose.model(collection, userSchema);

export default userModel;
