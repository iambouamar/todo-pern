const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// @desc Get all todos
// @route GET /todos
// @access Private
const getAllTodos = async (req, res) => {
  // Get all todos from MongoDB
  const todos = await prisma.todo.findMany();
  // If no todos
  if (!todos?.length) {
    return res.status(400).json({ message: "No todos found" });
  }

  // Add username to each todo before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const todosWithUser = await Promise.all(
    todos.map(async (todo) => {
      const user = await prisma.user.findUnique({
        where: { id: todo.userId },
      });
      return { ...todo, username: user.username };
    })
  );

  res.json(todosWithUser);
};

// @desc Create new todo
// @route POST /todos
// @access Private
const createNewTodo = async (req, res) => {
  const { user, title, text } = req.body;

  console.log({ body: req.body });
  // Confirm data
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // const duplicate = await prisma.user.findUnique({
  //   where: { title },
  // });

  // if (duplicate) {
  //   return res.status(409).json({ message: "Duplicate todo title" });
  // }

  const result = await prisma.todo.create({
    data: { userId: +user, title, text },
  });
  res.status(201).json(result);
};

// @desc Update a todo
// @route PATCH /todos
// @access Private
const updateTodo = async (req, res) => {
  const { id, title, text, completed } = req.body;

  // Confirm data
  if (!id || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm todo exists to update
  const todo = await prisma.todo.findUnique({
    where: { id: +id },
  });

  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }

  // Check for duplicate title
  // const duplicate = await prisma.user.findUnique({ where: { title } });

  // Allow renaming of the original todo
  // if (duplicate && duplicate?._id.toString() !== id) {
  //   return res.status(409).json({ message: "Duplicate todo title" });
  // }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { title, text, completed },
  });

  res.json(`'${updatedTodo.title}' updated`);
};

// @desc Delete a todo
// @route DELETE /todos
// @access Private
const deleteTodo = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Todo ID required" });
  }

  // Confirm todo exists to delete
  const todo = await prisma.user.findUnique({
    where: { id },
  });

  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }

  const result = await prisma.todo.delete({
    where: {
      id: Number(id),
    },
  });

  const reply = `Todo '${result.title}' deleted`;
  // const reply = `Todo '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllTodos,
  createNewTodo,
  updateTodo,
  deleteTodo,
};
