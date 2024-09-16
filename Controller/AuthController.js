import userData from "../Modals/AuthModal.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register
export const createDataController=async(req,res)=>{
try{
    
    const {name,email,password} = req.body 
    
    if(!name || !email ||!password){

            return res.status(400).send({
            success:false,
            message:"Please fill all the fields"
        })
    }
    const mailcheck = await userData.findOne({email})
    if(mailcheck){
        return res.status(401).send({
            success:false,
            message:"Email is already available"
        })
    }

    const salt=await bcrypt.genSalt(7)
    const hashedPassword = await bcrypt.hash(password,salt)

    
    const data = await userData({ name,email,password:hashedPassword}).save()
     return res.status(200).send({
        success:true,
        message:"User Register Succesfully",
        data
     })       

}catch(error){
        return res.status(500).send({
        success:false,
        message:"Error in  User Register",
        error
     })       

}
}

//login

export const getDataController =async(req,res)=>{
try{
    
    const {email,password} =req.body  
    

    if(!email || !password){
        return res.status(401).send({
            success:false,
            message:"Please fill all the feilds"
        })
    }
    
    const user =await userData.findOne({email});
    if(!user){
        return res.status(401).send({
            success:false,
            message:"User is not register"
        })
    }
    const ismatch =await bcrypt.compare(password,user.password) 
    if(!ismatch){
            return res.status(401).send({
            success:false,
            message:"Password is not matching"
        })
    }

     const token =await jwt.sign({
        id:user._id,
        name:user.name,
        email:user.email
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"})

    
    return res.status(200).send({
        success:true,
        message:"User Login Successfully",
        token
        
    })
}catch(error){
    return res.status(500).send({
        success:false,
        message:"Error in  User Register",
        error
     })      

}
}