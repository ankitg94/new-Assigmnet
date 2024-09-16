import TaskData from "../Modals/TaskModel.js";
import userData from "../Modals/AuthModal.js";
import sendEmail from "../nodemailer/mail.js";

export const createTaskController=async(req,res)=>{
try{
    const userid = req.userId;
    const {title,description,status,duedate} = req.body;
    const today =new Date();
    const due =new Date(duedate);
    const diff =Math.abs(due-today);
    var remday =Math.floor(diff/(1000*60*60*24));

   const task =await TaskData({title,description,status,duedate,remday,userid}).save();

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

export const getAllTaskControllera = async (req, res) => {
    try {
        const userId = req.userId;  
        const userDatanew =await userData.findById(userId)
        const name  = userDatanew.name;
        const email = userDatanew.email;
        const tasks = await TaskData.find({ userid: userId });  
        const currentDate = new Date();  
        for (let task of tasks) {
            const taskId = task._id.toString(); 
            const taskDueDate = new Date(task.duedate); 
            const remainingDays = Math.floor((taskDueDate - currentDate) / (1000 * 60 * 60 * 24));           
            if (remainingDays <= 0) {
                var updatedTask = await TaskData.findByIdAndUpdate(taskId,{ status: 'completed',remday:remainingDays}, { new: true });
                const emailData ={
                    from: 'noreply@node-react.com',
                    to: email, 
                    subject: 'your task deadline reminder',
                    text: `Name: ${name}`,
                    html: `
                        <h2>Deadline Reminder </h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <p>${updatedTask.title}</p>                       
                        <p>${updatedTask.description}</p>
                        <p>${updatedTask.status}</p>
                        <p>${updatedTask.remday}</p>
                        `
                };
                
        
               sendEmail(emailData);
            }
        }
        const alldata =await TaskData.find({userid:userId})
      
        return res.status(200).send({
            success: true,
            message: "All task data",
            total:alldata.length,
            data:alldata
        });

    }catch (error) {
           return res.status(500).send({
            success: false,
            message: "Error in getting the task data",
            error: error.message
        });
    }
};





export const deleteTaskController =async(req,res)=>{
    try{
        const userid=req.userId;
        const id =req.params.id; 
        const userAuth =await TaskData.findOne({_id:id,userid:userid});
        if(!userAuth){
          return res.status(400).send({
            success:false,
            message:"you are not authorize to delete"
          })
        }
        
    const deleteData =await TaskData.findByIdAndDelete(id);

      if(!deleteData){
        return res.status(400).send({
            success:false,
            message:"you have already deleted"
        })
      }


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

export const updateTaskContolller = async(req,res)=>{
    try{
        const userid=req.userId;
        const id =req.params.id; 
        const userAuth =await TaskData.findOne({_id:id,userid:userid});
        if(!userAuth){
          return res.status(400).send({
            success:false,
            message:"you are not authorize to update"
          })
        }


        const {title,description,status,duedate} = req.body;
        const today =new Date();
        const due =new Date(duedate);
        const diff =Math.abs(due-today);
        var remday =Math.floor(diff/(1000*60*60*24));

        const updatedtask =await TaskData.findByIdAndUpdate(id,
        {title,description,status,duedate,remday},
        {new:true})

     return res.status(200).send({
        success:true,
        message:"data updated  successfully",
        updatedtask
    })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"Error in update the task",
            error:error.message
         })
    }
}  