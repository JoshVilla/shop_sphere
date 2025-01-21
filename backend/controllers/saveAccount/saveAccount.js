import { compare, hash } from "bcrypt";
import UserModel from "../../models/Resgister.js";

const saveAccount = async (req, res) => {
  try {
    const { username, firstname, lastname, email, password, newPassword, id } =
      req.body;
    const newData = {};

    // Get the user from the database using their ID
    const user = await UserModel.findById(id);

    // If the user does not exist, return an error response
    if (!user) {
      return res.status(404).json({ msg: "User not found", isSuccess: 0 });
    }

    // Compare the entered password with the stored password
    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      return res.json({
        msg: "Password does not match with the current password",
        isSuccess: 0,
      });
    }

    // Only proceed with account update if the password is correct
    if (username) newData.username = username;
    if (firstname) newData.firstname = firstname;
    if (lastname) newData.lastname = lastname;
    if (email) newData.email = email;

    // If newPassword is provided, hash it before saving
    if (newPassword) {
      const hashedNewPassword = await hash(newPassword, 10);
      newData.password = hashedNewPassword;
    }

    // If no fields were provided for update, return a response
    if (Object.keys(newData).length === 0) {
      return res.status(400).json({
        msg: "No fields to update",
        isSuccess: 0,
      });
    }

    // Update the user in the database
    const updatedUser = await UserModel.findByIdAndUpdate(id, newData, {
      new: true, // Returns the updated user document
    });

    // Return the updated user info
    return res.status(200).json({
      msg: "Account updated successfully",
      updatedUser,
      isSuccess: 1,
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error(err);

    // Send a generic error response
    return res.status(500).json({
      msg: "Internal server error",
      isSuccess: 0,
    });
  }
};

export default saveAccount;
