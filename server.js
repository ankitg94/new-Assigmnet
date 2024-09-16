import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import { ConnectDb } from "./Config/db.js"
import AuthRoute from "../lead/Route/AuthRoute.js"
import TaskRoute from "../lead/Route/TaskRoute.js"
import msgRoute from './Route/MsgRoute.js'
import cronJobs from "./Schedule/cronJobs.js";
configDotenv()
ConnectDb()
const app = express() 
app.use(express.json())
app.use(cors())

app.use("/api/v1/auth",AuthRoute) 
app.use("/api/v1/Task",TaskRoute) 
app.use("/api/v1/msg",msgRoute)

const Port = process.env.PORT
app.listen(Port,()=>{
  console.log(`server is Running succesfully at the ${Port}`)
})