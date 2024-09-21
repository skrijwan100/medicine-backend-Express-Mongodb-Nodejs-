const jwt=require("jsonwebtoken")
JWT_SERECT="ufhg^)#*dfn"

const fecthuser=(req,res,next)=>{
    try {  

    let token = req.header('auth-token')
    if(!token){
       return res.status(404).json({"massage":"Invalid Auth token"})
    }
    const data = jwt.verify(token,JWT_SERECT)
    console.log(data)
     req.user=data.user

    next()
} catch (error) {
     console.log(error)
    res.status(500).send("intarnal server error.")
        
}



}
module.exports=fecthuser;