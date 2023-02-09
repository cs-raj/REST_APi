// this will contain business logic
const { create } = require('domain');
const Users = require('../data/users.json');
const User = require('../model/user.model');
// This is the middleware that is just a function
// It will have access to req, res and next 
// The next will call the next middleware to be executed
const validateUser = (req, res, next) => {
    const keys = [
        "id",
        "name",
        "introduction",
        "profileImage",
        "profileLink"
    ];

    const result = keys.every((key)=>Object.keys(req.body).includes(key));
    if(!result){
        res.status(422).json({
            message: "Keys are not valid",
            data: {...req.body}
        });
    }
    next(createUser(req,res));
}

const getAllUsers = (req,res) => {
    res.status(200).json({
        message: "Data fetched successfully",
        data: [...Users]
    });
};

const getUserById = (req,res) => {
    const user = Users.find((ele)=>ele.id===req.params.id);
    if(user) {
        res.status(200).json({
            message: "User Found",
            data: user
        });
    }
    else {
        res.status(400).json({
            message: "User Not Found",
            data: ""
        });
    }
}

const createUser = (req,res) => {
    const newUser = new User(req.body);
    Users.push(newUser);
    res.status(200).json({
    message:"user added sucessfully",
    data : {...Users}
    });
}

const updateUser = (req,res) => {
    const updateObject = req.body;
    console.log(req.body);
    const objectToUpdate = Users.find((obj)=>obj.id==req.params.id);
    objectToUpdate[Object.keys(updateObject)[0]] = Object.values(updateObject)[0]; //Working on the copy of the object
    console.log(Users);
    res.status(200).json({
        message:"user Updated sucessfully",
        data : {...objectToUpdate}
    });
}

const deleteUser = (req,res) => {
    const index = Users.findIndex((ele)=>ele.id===req.params.id);
    console.log(index);
    if(index!==-1){
        Users.splice(index,1);
        res.status(200).json({
            message: "User Deleted Successfully",
            data: Users
        });
    } else {
        res.status(400).json({
            message: "User Not Found",
            data: ""
        });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    validateUser
}