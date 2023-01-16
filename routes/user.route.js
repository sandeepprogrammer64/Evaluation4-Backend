

const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/User.model")

const userRouter = express.Router()


userRouter.post("/register", (request, response) =>
{

    const {name, email, gender, password} = request.body
    try {

        bcrypt.hash(password, 6, async (err, hash) =>
        {
            if(err)
            {
                console.log(err)
            }
            else
            {
                const user = new UserModel({name, email, password:hash, gender})
                await user.save()
                response.send("Data Registered")
            }
        })
        
    } catch (error) {
        response.send("Error while Registering")
        console.log(error)
        
    }
})

userRouter.post("/login", async (request, response) =>
{
    const {email, password} = request.body
    try {
        
        const user = await UserModel.find({email})
        if(user.length > 0)
        {
            bcrypt.compare(password, user[0].password, (err, result) =>
            {
                if(result)
                {
                    const token = jwt.sign({userID: user[0]._id}, "snigdha")
                    response.send({"msg":"Logged in successfully", "token":token})
                }
                else
                {
                    response.send("Error while logging in")
                }
            })
        }
        else
        {
            response.send("Error while logging in")
        }

        console.log(user)
    } catch (error) {

        response.send("Error while loggin in")
        console.log(error)
        
    }
})




module.exports ={userRouter}