import { compare, hash } from "bcrypt";
import UserModel from "../../models/Resgister.js";

const saveAccount = async (req, res) => {
  try {
    const { username, firstname, lastname, email, password, newPassword, id } =
      req.body;

    // Fetch the user from the database
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found", isSuccess: 0 });
    }

    if (user.isThirdPartyAccount === 0) {
      // Ensure the password exists in both user and req.body
      if (!password || !user.password) {
        return res.status(400).json({
          msg: "Password is required for non-third-party accounts",
          isSuccess: 0,
        });
      }

      // Compare the provided password with the stored hash
      const isPasswordMatch = await compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          msg: "Password does not match with the current password",
          isSuccess: 0,
        });
      }
    }

    // Update logic
    const newData = {};
    if (username) newData.username = username;
    if (firstname) newData.firstname = firstname;
    if (lastname) newData.lastname = lastname;
    if (email) newData.email = email;

    if (newPassword) {
      const hashedNewPassword = await hash(newPassword, 10);
      newData.password = hashedNewPassword;
    }

    if (Object.keys(newData).length === 0) {
      return res.status(400).json({ msg: "No fields to update", isSuccess: 0 });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, newData, {
      new: true,
    });

    return res.status(200).json({
      msg: "Account updated successfully",
      updatedUser,
      isSuccess: 1,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Internal server error",
      isSuccess: 0,
    });
  }
};

export default saveAccount;
