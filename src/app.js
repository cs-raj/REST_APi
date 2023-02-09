const express = require("express");
const app = express();
const userRouter = require('../router/user.router.js');
app.use(express.json());

app.use("/users",userRouter);
app.listen(3000,()=>{
    console.log("Server is running at 3000 port");
});