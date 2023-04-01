const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://chakshu05kishnani:chakshu05kishnani@cluster0.7zcgzp2.mongodb.net/?retryWrites=true&w=majority`).then(res=>{
    console.log("connected");
})