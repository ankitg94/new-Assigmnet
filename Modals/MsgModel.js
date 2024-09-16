import mongoose from "mongoose";

const msgSchema =new mongoose.Schema({
 name:{
    type:String
 },
 email:{
    type:String
 },
 message:{
    type:String
 }
})

const MsgData =mongoose.model("msg",msgSchema)
export default MsgData;