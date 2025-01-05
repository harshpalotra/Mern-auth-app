const UserModel = require("../Models/user");
const bcrypt = require('bcrypt');

const signup = async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message:'user is already exist, you can login', success:false});
        }

        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
        .json({
            message: "Signup Successfully",
            success: true
        })

    }catch(err){
        res.status(201)
        .json({
            message: "Internal server error ",
            success: false
        })
    }
}

const jwt = require('jsonwebtoken'); // Ensure this is imported at the top

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = "Auth failed or password is wrong";

        // Check if user exists
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        // Compare passwords
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Corrected expiration time
        );

        // Send success response
        res.status(201)
            .json({
                message: "Login successfully",
                success: true,
                jwtToken,
                email,
                name: user.name
            });

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
};


module.exports = {
    signup,
    login
}