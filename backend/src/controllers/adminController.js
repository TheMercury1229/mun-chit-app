import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export const signup = async (req, res) => {
  try {
    const { username, password, portfolio, role, committee } = req.body;
    // Check if username and password are provided
    if (!username || !password || !portfolio || !committee) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a user
    const userRole = Object.values(Role).includes(role) ? role : Role.DELEGATE;
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        portfolio,
        role: userRole,
        committee,
      },
    });
    if (newUser) {
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        portfolio: newUser.portfolio,
        role: newUser.role,
        committee: newUser.committee,
        message: "User created successfully",
      });
    }
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
