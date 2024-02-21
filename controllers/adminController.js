import { adminService,imageUploadService } from "../services/index.js"

const TAG = 'controller.admin';


const getAdmins = async(req,res,next)=>{
    try{
        const result = await adminService.getAdmins();
        res.status(result.status).send({
            status : result.status,
            message : result.message,
            data : result.data,
        })
    }catch(error){
        console.error(`${TAG} ERROR in getAdmins() => ${error.message}`);
        next(error)
    }
}

export {
    getAdmins,
}