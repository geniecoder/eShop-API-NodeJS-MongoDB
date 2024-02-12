const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyToken = require("../middleware/verifyToken");

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw Error("User not found");
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) throw Error("User not found");
      let updatedUser = user.toObject();

      // Delete the few field from the newUser object
      delete updatedUser.password;
      delete updatedUser.__v;
      res.json(updatedUser);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //Conpare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    let updatedUser = user.toObject();

    // Delete the few field from the newUser object
    delete updatedUser.password;
    delete updatedUser.__v;

    res.status(200).json({
      updatedUser,
      token,
    });
  },

  createUser: async (req, res) => {
    const user = new User(req.body);

    // check if all mandatory fields are there
    const { email, password, name } = user;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // check if user already registered
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    try {
      const newUser = await User.create(user);
      let updatedUser = newUser.toObject();

      // Delete the few field from the newUser object
      delete updatedUser.password;
      delete updatedUser.__v;

      res.status(201).json(updatedUser);
    } catch (error) {
      // Handle any errors that occur during user creation
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser) throw Error("User not found");
      res.json(updatedUser);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) throw Error("User not found");
      res.json(deletedUser);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = UserController;
