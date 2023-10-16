const User = require("../models/User");
const OTP = require("../models/OTP");

const otpGenerator = require("otp-generator")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.sendotp = async (req, res) => {
	try {
		const { email } = req.body;

		const checkUserPresent = await User.findOne({ email });

		if (checkUserPresent) {
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		const result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};


exports.signup = async (req,res)=>{
    try {
        const {
            firstName,
            lastName,
            mobile,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } =req.body.accountType;

        console.log("boody",req.body.accountType)
      console.log("firstName",firstName)
      console.log("lastName",lastName)
      console.log("mobile",mobile)
      console.log("email",email)
        if(!firstName || !lastName || !email ||!password || !confirmPassword || !mobile || !otp){
            return res.status(403).json({
                success:false,
                message:"all fields are mandatory to fill"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirmpassword does not match"
            })
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist please login to continue"
            })
        }

        // find more recent otp

        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(recentOtp.length ===0){
            return res.status(400).json({
                success:false,
                message:"otp not found in db"
            })
        
        } else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"invalid otp"
            })
        }

        let approved = "";
		approved === "Transporter" ? (approved = false) : (approved = true);

        const hashedPassword = await bcrypt.hash(password,10);

       

        const user = await User.create({
            firstName,
            lastName,
            email,
            mobile,
            password:hashedPassword,
            accountType,
            approved:approved,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:"user is registerd succcessfully",
            user
        })

    } catch (error) {
        console.log(error)
        
        return res.status(500).json({
            success:false,
            message:"user cannot be registered Please try again "
        })
    }
}

exports.login = async (req, res)=>{
    try {
        
        const {email,password}= req.body;

        if(!email||!password){
            return res.status(403).json({
                success:false,
                message:"pleaase enter all the details"
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                 success:false,
                 message:"user not found please register to login "
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET,{
                expiresIn:"2h"
            })

            user.token = token;
            user.password =undefined
            console.log(user)
            
            const options ={
                expires:new Date(Date.now() + 3*24+60*60*100),
                httpOnly:true
            }

            res.cookie("token",token, options).status(200).json({
                success:true,
                token,
                user,
                message:"logged in successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password is incorrect"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"login failed"
        })
    }
    
}

