const OTP = require("../model/otp.js");
const otpGenerator = require("otp-generator");
const twilio = require("twilio");
const otpVerification = require("../helper/otpValidate.js");

const account = process.env.ACCOUNT_SID;
const auth = process.env.AUTH_TOKEN;
const tw = process.env.TWILIO_NUMBER

const twilioClient = new twilio(account, auth);

const sendOtp = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        const cDate = new Date();

        // Convert phoneNumber to a valid ObjectId
        const filter = { phoneNumber };

        await OTP.findOneAndUpdate(
            filter,
            {
                otp,
                otpExpiration: new Date(cDate.getTime())
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );

        await twilioClient.messages.create({
            body: `tour OTP id ${otp}`,
            to: phoneNumber ,
            from : tw
        });

        return res.status(200).json({
            success: true,
            msg: `OTP sent successfully ${otp}`
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};


const  verifyOtp =  async (req,res)=>{
    try {
        const {phoneNumber , otp} = req.body ;
        const data = await OTP.findOne({
            phoneNumber,
            otp,
        });

        if(!data){
            return res.status(400).json({
                success: false,
                msg: `you enter wrong OTP ${otp}`
            });
        }

        const otpExpire = await otpVerification(data.otpExpiration);
        if(otpExpire){
            return res.status(400).json({
                success: false,
                msg: "your OTP Expired !"
            });
        }
            return res.status(200).json({
                success: true,
                msg: `OTP successfully verified ${otp}`
            });
        


    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

module.exports = {
    sendOtp , verifyOtp
};
