import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
