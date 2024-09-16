import express from "express"
import { createDataController, getDataController } from "../Controller/AuthController.js";

const route = express.Router()
route.post("/register",createDataController)
route.post("/login",getDataController)


export default route;