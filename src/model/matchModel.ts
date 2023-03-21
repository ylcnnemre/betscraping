import mongoose from "mongoose";


const teamSchema=new mongoose.Schema({
    teamNames  : {
        type : String
    },
    leauge : {
        type  : String
    },
    date : {
        type : String
    },
    guess :{
        type : String
    },
    oddValue : {
        type : String
    }
},{
    timestamps : true,
    versionKey : false 
})


const matchModel = mongoose.model("betmatch",teamSchema)

export {
    matchModel
}