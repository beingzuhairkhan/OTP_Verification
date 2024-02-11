const otpVerification = async (otpTime) => {
    try {
        const cDateTime = new Date();
        let differenceTime = (otpTime - cDateTime) / 1000;  
        let minutes = Math.abs(differenceTime) / 60;  

        console.log(`${minutes}`);

        if (minutes > 2) {
            return true;
        } 
            return false;
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = otpVerification;
