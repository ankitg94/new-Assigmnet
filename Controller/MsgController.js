import MsgData from "../Modals/MsgModel.js"
import  sendEmail  from "../nodemailer/mail.js";

export const sendMsgController =async(req,res)=>{
    try{
        const {name,email,message}=req.body
        const emailData ={
            from: 'noreply@node-react.com',
            to: 'ankit8009566@gmail.com', 
            subject: 'your task deadline reminder',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <h2>Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                
            `
        };
        

       sendEmail(emailData);

        const msg =await MsgData({name,email,message}).save()
        
        
        
        return res.status(200).send({
            success:true,
            message:"your message sent successfully",
            msg
        })

    }catch(error){
        return res.status(400).send({
            success:false,
            Message:error.Message
        })
    }
}