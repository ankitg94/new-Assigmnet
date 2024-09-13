
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"users",
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    status:{
      type:String,
      enum:['pending','completed'],
      default:'pending'
    }
   
})
const TaskData =mongoose.model('tasks',TaskSchema) 
export default TaskData