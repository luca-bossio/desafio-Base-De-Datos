import admin from "../app.js";

const userLicense = (req,res,next)=>{
    if (admin){
        next();
    }else{
        res.send("No tienes los permisos necesarios")
    }
}

export default userLicense