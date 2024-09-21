const fecthadmin=(req,res,next)=>{
    try {
        
   
    let admintoken=req.header('admin-token')
    if(admintoken!='iamskrijwaniamadmin'){
       return res.status(404).json({"massage":"Ivalid admin token."})
    }
    next()
} catch (error) {
    console.log(error)
    res.status(500).send("intarnal server error.") 
}

}
module.exports=fecthadmin;