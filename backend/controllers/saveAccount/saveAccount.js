import { compare, hash } from "bcrypt";
import UserModel from "../../models/Resgister.js";
import cloudinary from "../../config/cloudinaryConfig.js";
import fs from "fs";

// Function to save Base64 encoded file
const saveBase64Image = (base64Str, filename) => {
  const base64Data = base64Str.replace(/^data:image\/\w+;base64,/, "");
  fs.writeFileSync(`uploads/${filename}`, base64Data, "base64");
  return `uploads/${filename}`; // Return the file path
};

const saveAccount = async (req, res) => {
  try {
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      newPassword,
      id,
      avatar,
    } = req.body;

    // Fetch user by ID
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found", isSuccess: 0 });
    }

    // Validate password for non-third-party accounts
    if (user.isThirdPartyAccount === 0 && (password || newPassword)) {
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

    // Handle avatar upload (Base64 to file)
    let avatarUrl = "";
    if (avatar) {
      const avatarFilePath = saveBase64Image(
        avatar,
        `${Date.now()}-avatar.png`
      );
      const uploadResponse = await cloudinary.uploader.upload(avatarFilePath, {
        folder: "profiles",
      });
      avatarUrl = uploadResponse.secure_url;
    }

    console.log(req.body);

    // Prepare the data for update
    const newData = {
      ...(username && { username }),
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
      ...(email && { email }),
      ...(avatarUrl && { avatarUrl }), // Set avatar URL if uploaded
    };

    if (newPassword) {
      newData.password = await hash(newPassword, 10); // Hash new password before saving
    }

    if (!Object.keys(newData).length) {
      return res.status(400).json({ msg: "No fields to update", isSuccess: 0 });
    }

    // Update user in database
    const updatedUser = await UserModel.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      isSuccess: 1,
      msg: "Account updated successfully",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong", isSuccess: 0 });
  }
};

export default saveAccount;
