require('dotenv').config()
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const db = require('../models/db.model');
const UserModel = db.User;
var passport = require('passport')
// const { DEFAULT_AVT } = require('../config/common.config')
const { PERMISSION_MEMBER, PERMISSION_ADMIN } = require("../config/permission.config");

exports.signup = async( req, res )=>{
    const {
        username,
        email,
        password,     
    } = req.body
    try {
        const createData = {
            username,
            email,
            hashPwd : md5(password),
            iamRole: PERMISSION_MEMBER,
            avatar: process.env.DEFAULT_AVT
        };

        await UserModel.create(createData);       
        return res.status(201).json({
            message: "Create user successfully!",
            username: createData.username,
            email: createData.email
        });    
    } catch(error){
        return res.status(500).json({message:error.message});
    }
};
exports.signin = async ( req, res ) => {
    const{ username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({message: "Please enter your username or password!"})
    }

    //check username in database
    try {
        const foundUser = await UserModel.findOne({
            where: {
                        username
                    }
        });
                
        if (!foundUser) {
            return res.status(404).json({message: "Not found user!"});
        }

        if( md5(password) !== foundUser.hashPwd) {
            return res.status(400).json({message: "Your password invalid!"});
        }

            //generate token
        const token = jwt.sign( { id:foundUser.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
        return res.status(200).json({
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.iamRole,
            avatar: foundUser.avatar,
            accessToken : token
        });

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

exports.userGoogle = async (req, res) => {

    try {
        const foundUser = await UserModel.findOne({
            where: {
                idFacebook: profile.idFacebook
            }
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
