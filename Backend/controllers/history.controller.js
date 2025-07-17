const historyModel = require('../models/history.model')

const getHistory = async (req, res)=>{
    try {
        const email = req.query.email
        console.log("email: ", email)
        const history = await historyModel.findOne({
            user:email
        })
        if(history){
            return res.status(200).json({
                success:true,
                data:history.data
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Data do not exists"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

const postHistory = async (req, res)=>{
    try {
        const prev_history = await historyModel.findOne({
            user:req.body.user
        })
        // console.log(prev_history)
        if(prev_history){
            let prevArray = prev_history.data
            for (let index = 0; index < prevArray.length; index++) {
                console.log(prevArray[index].location);
                if(prevArray[index].location == req.body.data[0].location){
                    return res.status(304).json({
                        success:false,
                        message:"Already already exists in history"
                    })
                }
            }
            if(prevArray.length==5){
                prevArray.shift()
                prevArray.push(req.body.data[0]);
            }
            else{
                prevArray.push(req.body.data[0]);
            }
            prev_history.save()
            return res.status(200).json({
                success:true,
                message:"Added to history successfully"
            })
        }
        else{
            const history = await historyModel.create(req.body)
            if(history){
                return res.status(200).json({
                    success:true,
                    message:"Added to history successfully"
                })
            }
            else{
                return res.status(400).json({
                    success:false,
                    message:"Failed to add history"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


module.exports = {getHistory, postHistory}