import mongoose from "mongoose"


export const ConnectDb = async()=>{
    try{
        const data = await mongoose.connect(process.env.MonGo_URL)
        console.log("DataBase Connected successfully")

    }
    catch(error){
        console.log("Error in connecting the dataBase")
    }
}