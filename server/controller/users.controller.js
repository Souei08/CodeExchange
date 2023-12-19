import Users from "../models/users.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const getUsers = async (req, res) => {
  try {
    const getUsers = await Users.find();

    res.status(200).json(getUsers);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new Users({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({ message: "Login successful", token, userDetails: user });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { firstName, lastName, bio, email, password, username } = req.body;

    const newUser = {
      firstName,
      lastName,
      username,
      bio,
      email,
    };

    if (password) {
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);

      newUser.password = hashPassword;
    }

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { $set: newUser },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
