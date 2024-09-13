import TaskData from "../Modals/TaskModel.js"


export const createTaskController=async(req,res)=>{
try{
    const {title,description,status} = req.body;


const task =await TaskData({title,description,status}).save()

return res.status(200).send({
    success:true,
    message:"Task created  Succesfully",
    task
 })


}catch(error){
        return res.status(500).send({
        success:false,
        message:"Error in create task",
        error:error.message
     })
}
}
export const getAllTaskControllera=async(req,res)=>{
    try{
        const data =await TaskData.find({})

        return res.status(200).send({
            success:true,
            message:"all Task data ",
            total:data.length,
            data
         })
    }catch(error){
            return res.status(500).send({
            success:false,
            message:"Error in getting  the  task",
            error:error.message
         })

    }
}
export const deleteTaskController =async(req,res)=>{
    try{
        const id =req.params.id;
        
        const deleteData =await TaskData.findByIdAndDelete(id);

        return res.status(200).send({
            success:true,
            message:"data deleted successfully"
        })
    }catch(error){
           return res.status(500).send({
            success:false,
            message:"Error in delete the  task",
            error:error.message
         })


    }
}

export const updateTaskContolller =async(req,res)=>{
    try{
        const id =req.params.id;
        const {title,description,status} = req.body;
 
     const updatedtask =await TaskData.findByIdAndUpdate(id,
        {title,description,status},
        {new:true})


     return res.status(200).send({
        success:true,
        message:"data deleted successfully",
        updatedtask
    })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"Error in update the  task",
            error:error.message
         })
    }
}  