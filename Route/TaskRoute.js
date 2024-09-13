import express from "express"
//  import { authMiddleware } from "../Middleware/authMiddleware.js";
import { createTaskController, deleteTaskController, getAllTaskControllera, 
    updateTaskContolller } from "../Controller/TaskController.js";

const route =express.Router()
route.post("/createTask",createTaskController);
route.get("/getallmyTask",getAllTaskControllera);
route.put("/updateTask/:id",updateTaskContolller);
route.delete("/deleteTask/:id",deleteTaskController);


export default route;
