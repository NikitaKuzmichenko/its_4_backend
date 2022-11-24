const INTERNAL_ERROR_CODE = 500;
const INTERNAL_ERROR_MSG = "Internal error";

const errorHndler = (err,req,res,next) =>{
    res.status(INTERNAL_ERROR_CODE).json({message: INTERNAL_ERROR_MSG});
    next();
}

module.exports = errorHndler;