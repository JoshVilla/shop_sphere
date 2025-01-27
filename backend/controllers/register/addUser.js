import UserModel from "../../models/Resgister.js";
import { hash } from "bcrypt";

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate input
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      // Change status to 422 Unprocessable Entity
      return res.json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the user
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      email,
      firstname: "",
      lastname: "",
      hasStore: 0,
    });

    // Respond with success
    const { password: _, ...userInfo } = newUser.toObject();
    return res.status(201).json({
      message: "User registered successfully",
      user: { ...userInfo, _id: userInfo._id },
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export default register;
