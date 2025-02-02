async function getResumeController(req,res){
    console.log(req.body);
    return res.status(200).json({"resume":req.body})
}


module.exports={getResumeController}