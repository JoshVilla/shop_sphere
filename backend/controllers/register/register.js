import UserModel from "../../models/Resgister.js";

const getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await UserModel.find({});

    // If no users are found, return a 404 Not Found response
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Otherwise, return the users with a 200 OK response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    // Return a 500 Internal Server Error if there's an issue
    res.status(500).json({ message: "Server error" });
  }
};

export default getUsers;
