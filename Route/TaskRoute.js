import express from "express"
  import { authMiddleware } from "../Middleware/authMiddleware.js";
import { createTaskController, deleteTaskController, getAllTaskControllera, 
    updateTaskContolller } from "../Controller/TaskController.js";

const route =express.Router()
route.post("/createTask",authMiddleware,createTaskController);
route.get("/getallmyTask",authMiddleware,getAllTaskControllera);
route.put("/updateTask/:id",authMiddleware,updateTaskContolller);
route.delete("/deleteTask/:id",authMiddleware,deleteTaskController);


export default route;
