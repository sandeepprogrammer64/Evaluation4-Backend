

const express = require("express");
const {connection} = require("./configs/db");
const { authenticate } = require("./middlewares/authenticate.middleware");
const { postRouter } = require("./routes/post.route");
const { userRouter } = require("./routes/user.route");
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cors({
    origin:"*"
}))


app.use("/users", userRouter)
//app.use(authenticate)
app.use("/posts", postRouter)

app.get("/", (request, response) =>
{
    response.send("Social Media App")
})






app.listen(4500, async () =>
{
    try {

        await connection
        console.log("Connected To Database")
        
    } catch (error) {

        console.log(error)
        
    }
    console.log("Server Running at Port 4500")

})