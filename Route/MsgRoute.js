import express from "express";
import { sendMsgController } from "../Controller/MsgController.js";

const route =express.Router()
route.post("/sendmsg",sendMsgController)

export default route