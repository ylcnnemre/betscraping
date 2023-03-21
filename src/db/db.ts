import mongoose from "mongoose"

const dbConnection=()=>{

    mongoose.connect("mongodb://localhost:27017/betdb")
    const db=mongoose.connection

    db.on("error",console.error.bind(console,"connection error"))
    db.once("open",function(){
        console.log("db connection is success")
    })

}

export {
    dbConnection
}