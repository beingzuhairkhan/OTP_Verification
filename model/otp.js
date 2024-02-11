const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    phoneNumber : {
        type : String,
        required : true ,
    },
    otp : {
        type : String,
        required : true ,
    },
    otpexpiration : {
        type : Date,
        default: Date.now,
        get: (otpexpiration) => otpexpiration.getTime(),
        set: (otpexpiration) => new Date(otpexpiration)
    }
})

const OTP = mongoose.model("OTP" , otpSchema);

module.exports =  OTP ;