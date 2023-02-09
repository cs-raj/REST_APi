// this will contain business logic
const { create } = require("domain");
const User = require("../model/user.model");
const sendResponse = require("../helper/sendResponse");
const sendErrorResponse = require("../helper/sendErrorResponse");
const AppError = require("../helper/AppError");
const fs = require("fs"); // Used to Overwrite to a file
// This is the middleware that is just a function
// It will have access to req, res and next
// The next will call the next middleware to be executed
const validateUser = (req, res, next) => {
  if(Object.keys(req.body).includes("id")){
    console.log("thor");
  }
  else {
    req.body.id = req.params.id;
  }
  const keys = ["id", "name", "introduction", "profileImage", "profileLink"];

  const result = keys.every((key) => Object.keys(req.body).includes(key));
  if (!result) {
    return sendErrorResponse(
      new AppError({
        message: "Keys are not valid",
        data: { ...req.body },
        statusCode: 422,
      }),
      req,
      res
    );
  }
  next();
};

const getAllUsers = (req, res) => {
  const Users = JSON.parse([fs.readFileSync("./data/users.json", "utf8")]);
  sendResponse(req, res, {
    message: "Data fetched successfully",
    data: [...Users],
    statusCode: 200,
  });
};

const getUserById = (req, res) => {
  const user = Users.find((ele) => ele.id === req.params.id);
  if (user) {
    sendResponse(req, res, {
      message: "User Found",
      data: [user],
      statusCode: 200,
    });
  } else {
    sendErrorResponse(
      new AppError({ message: "User Not Found", data: {}, statusCode: 400 }),
      req,
      res
    );
  }
};

const createUser = (req, res) => {
  const newUser = new User(req.body);
  const Users = JSON.parse([fs.readFileSync("./data/users.json", "utf8")]);
  Users.push(newUser);

  try {
    fs.writeFileSync("./data/users.json", JSON.stringify(Users));
  } catch (err) {
    console.error(err);
  }
  sendResponse(req, res, {
    message: "User Added Sucessfully",
    data: [...Users],
    statusCode: 200,
  });
};

const updateUser = (req, res) => {
  const Users = JSON.parse([fs.readFileSync("./data/users.json", "utf8")]);
  const user = Users.find((ele) => ele.id === req.params.id);
  if (user) {
    const updateObject = req.body;
    const objectToUpdate = Users.find((obj) => obj.id == req.params.id);
    for (let i = 0; i < Object.keys(updateObject).length; i++) {
      objectToUpdate[Object.keys(updateObject)[i]] =
        Object.values(updateObject)[i]; //Working on the copy of the object
    }

    try {
      fs.writeFileSync("./data/users.json", JSON.stringify(Users));
    } catch (err) {
      console.error(err);
    }
    sendResponse(req, res, {
      message: "User Updated sucessfully",
      data: [Users],
      statusCode: 200,
    });
  } else {
    sendErrorResponse(
      new AppError({ message: "User Not Found", data: {}, statusCode: 422 }),
      req,
      res
    );
  }
};

const deleteUser = (req, res) => {
  const Users = JSON.parse([fs.readFileSync("./data/users.json", "utf8")]);
  const index = Users.findIndex((ele) => ele.id === req.params.id);
  if (index !== -1) {
    Users.splice(index, 1);
    try {
      fs.writeFileSync("./data/users.json", JSON.stringify(Users));
    } catch (err) {
    }
    sendResponse(req, res, {
      message: "User Deleted Successfully",
      data: [...Users],
      statusCode: 200,
    });
  } else {
    sendErrorResponse(
      new AppError({ message: "User Not Found", data: {}, statusCode: 422 }),
      req,
      res
    );
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  validateUser,
};
