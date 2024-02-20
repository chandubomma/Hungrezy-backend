
const isRestaurant = async(req,res,next)=>{
    try{
        if(req.user_role!='restaurant')res.status(403).send({
            message: 'Access denied',
        });
        else next()
    }catch(error){
        res.status(500).send({error})
    }
}


export {
    isRestaurant,
}