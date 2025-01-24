import multer from "multer";
import { compare, hash } from "bcrypt";
import UserModel from "../../models/Resgister.js";
import cloudinary from "../../config/cloudinaryConfig.js";

// Configure multer for temporary file storage
const upload = multer({ dest: "uploads/" });

const saveAccount = async (req, res) => {
  try {
    const { username, firstname, lastname, email, password, newPassword, id } =
      req.body;

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

    // Handle avatar upload
    let avatarUrl = "";
    console.log(req.body);
    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "profiles",
      });
      avatarUrl = uploadResponse.secure_url;

      // Optionally, delete the file from local storage after upload
      fs.unlinkSync(req.file.path);
    }

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
