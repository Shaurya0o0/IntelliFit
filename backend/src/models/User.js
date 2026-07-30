import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },

    password:{
        type:String,
        required:true
    },

    age:{
        type:Number
    },

    gender:{
        type:String
    },

    height:{
        type:Number
    },

    weight:{
        type:Number
    },

    goal:{
        type:String
    },

    activityLevel:{
        type:String
    },

    diet:{
        type:String,
        enum:["Veg","Non-Veg"],
        default:"Non-Veg"
    }

},
{
    timestamps:true
});

export default mongoose.model("User",userSchema);