import UserModel from "../../models/Resgister.js";
import { compare } from "bcrypt";

const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with success
    return res.status(200).json({
      message: "Logged in successfully",
      user, // Include non-sensitive user details
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export default loginCustomer;
