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

    // Validate password for non-third-party accounts
    if (user.isThirdPartyAccount === 0) {
      if (password && newPassword) {
        if (!password || !user.password) {
          return res.status(400).json({
            msg: "Password is required for non-third-party accounts",
            isSuccess: 0,
          });
        }

        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
          return res.status(400).json({
            msg: "Current password is incorrect",
            isSuccess: 0,
          });
        }
      }
    }

    // Prepare updated data
    const newData = {
      ...(username && { username }),
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
      ...(email && { email }),
    };

    if (newPassword) {
      newData.password = await hash(newPassword, 10);
    }

    if (!Object.keys(newData).length) {
      return res.status(400).json({ msg: "No fields to update", isSuccess: 0 });
    }

    // Update the user
    const updatedUser = await UserModel.findByIdAndUpdate(id, newData, {
      new: true,
    });

    return res.status(200).json({
      msg: "Account updated successfully",
      updatedUser,
      isSuccess: 1,
    });
  } catch (err) {
    console.error("Error updating account:", err);
    return res.status(500).json({
      msg: "Internal server error",
      isSuccess: 0,
    });
  }
};

export default saveAccount;
