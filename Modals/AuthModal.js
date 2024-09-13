import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    password:{
      type:String
    }
})
const userData =mongoose.model('users',userSchema) 
export default userData