const express = require('express');
const router = express.Router();
// Import fucntions from controller which you want to execute
const {getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    validateUser } = require('../controller/user.controller');
router.route("").get(getAllUsers).post(validateUser,createUser);
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);
module.exports = router;
