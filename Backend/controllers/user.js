import User from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";


const login = async (req, res) => {

    console.log("Login request received");
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({message: "Missing username or password"});
    }

    try{

        const user = await User.findOne({username: username});

        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        let isPasswordValid = await bcrypt.compare(password, user.password);

       if(isPasswordValid){
        let token = crypto.randomBytes(64).toString("hex");

        user.token = token;
        await user.save()
        return res.status(200).json({message: "User logged in", token: token});
    }else{
        return res.status(400).json({message: "Invalid password"});
    }

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Server error"});
    }
}


const signup = async (req, res) => {
    
    const {username, password, email} = req.body;

    try{

        const existingUser = await User.findOne({userName: username});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            password: hashedPassword,
            email: email
        })

        await newUser.save().then(console.log("User created"));

        res.status(200).json({message: "User registered"} );

    }catch (e){
        console.log(e);
        return res.status(500).json({message: "Server error"});
    }
}



export { signup, login};