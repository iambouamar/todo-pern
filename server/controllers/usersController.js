const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  // Get all users from MongoDB
  const users = await prisma.user.findMany();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
  const { username, password, role } = req.body;

  // Confirm data
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await prisma.user.findUnique({
    where: { username },
  });

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = !role
    ? { username, password: hashedPwd }
    : { username, password: hashedPwd, role };

  const result = await prisma.user.create({
    data: userObject,
  });
  res.status(201).json(result);
};

module.exports = {
  getAllUsers,
  createNewUser,
  // updateUser,
  // deleteUser,
};
