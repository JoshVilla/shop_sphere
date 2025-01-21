import UserModel from "../../models/Resgister.js";

const googleLogin = async (req, res) => {
  try {
    const { username, email, firstname, lastname } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (user) {
      console.log(user, "Existing user");
      return res.status(200).json({ data: user, isExist: true });
    }

    // If the user doesn't exist, create a new user
    const newUser = await UserModel.create({
      username,
      email,
      firstname,
      lastname,
      password: "", // Google OAuth typically does not require a password
    });

    console.log(newUser, "New user registered");
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during Google login:", error); // Log the full error for debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default googleLogin;
