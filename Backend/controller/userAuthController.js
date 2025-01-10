const User = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userAuthController = async (req, res) =>{

        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});

            if(user && await bcrypt.compare(password, user.password)){
                const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '2h'});

                res.status(200).json({message: "Login successfull", token, user});
            } else{
                res.status(401).json({message: "Invalid credentials"});
            }
        } catch (error) {
            res.status(500).json({message: error.message});
        }
} 

module.exports = userAuthController;