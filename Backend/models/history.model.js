const {Schema,model} = require("mongoose");

const historySchema = new Schema({
    user:{
        type:String,
    },
    data:[
        {
            "location":String,
            "temp":Number,
            "minimum":Number,
            "maximum":Number,
            "humidity":Number,
        }
    ]
})

const historyModel = model("history", historySchema);
module.exports = historyModel