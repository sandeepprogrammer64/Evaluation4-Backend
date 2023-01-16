

const express = require("express")

const {PostModel} = require("../models/Post.model")

const postRouter = express.Router()

postRouter.get("/", (request, response) =>
{
    response.send("All the Posts")
})

postRouter.get("/",async(req,res)=>{
    const q=req.query.device1;
    const q2=req.query.device2;
   
    try{
        if(q=="TABLET"){
            const post= await PostModel.find({device:"TABLET"});
            res.send(post)
        }else if(q=="PC"){
            const post= await PostModel.find({device:"PC"});
            res.send(post)
        }else if(q=="MOBILE"){
            const post= await PostModel.find({device:"MOBILE"});
            res.send(post)
        }
        else if(q=="MOBILE"&&q2=="PC"){
            const post= await PostModel.find({$or:[{device:"MOBILE"},{device:"pc"}]});
            res.send(post)
        }else{
            const post= await PostModel.find();
            res.send(post)

        }

    }catch(err){
        res.send("Something went wrong")
        console.log(err)
    }
})

postRouter.post("/create", async (request, response) =>
{
     const payload = request.body
     try {

        const new_post = new PostModel(payload)
        await new_post.save() 
        response.send("Posts Created")
        
     } catch (error) {
        
        console.log(error)
        response.send("Cannot create Posts")
        
     }
})

postRouter.patch("update/:id", async (request, response) =>
{
    const payload =request.body
    const id = request.params.id
    const post = await PostModel.findOne({"_id":id})
    const userID_in_post = post.userID
    const userID_make_request = request.body.userID

    try {

        if(userID_make_request != userID_in_post)
        {
            response.send("Not Authorized")
        }
        else
        {
            await PostModel.findByIdAndUpdate({"_id":id}, payload)
            response.send("Posts Updated")
        }
        
    } catch (error) {

        console.log(error)
        response.send("Error while Updating")
        
    }
})

postRouter.delete("/delete/:id", async (request, response) =>
{
    const id = request.params.id
    const post = await PostModel.findOne({"_id":id})
    const userID_in_post = post.userID
    const userID_make_request = request.body.userID

    try {

        if(userID_make_request != userID_in_post)
        {
            response.send("Not Authorized")
        }
        else
        {
            await PostModel.findByIdAndDelete({"_id":id})
            response.send("Posts Deleted")
        }
        
    } catch (error) {

        console.log(error)
        response.send("Error while Deleting")
        
    }
})

module.exports = {postRouter}

