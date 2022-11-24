const userRepo = require("../repository/UserRepo");
const cookieService = require("../service/CookieService");

const FROBIDDEN_ERROR_CODE = 403;
const FROBIDDEN_ERROR_ERROR_MSG = "Frobidden";
const UNAUTHORIZE_ERROR_CODE = 401;
const UNAUTHORIZE_ERROR_MSG = "Unauthorized";

async function authorize(req,res,next) {
    const currentUserId = cookieService.getUserId(req);
    if(currentUserId == undefined){
        return res.status(UNAUTHORIZE_ERROR_CODE).json({message: UNAUTHORIZE_ERROR_MSG});
    }
    const currentUer = await userRepo.getById(currentUserId);
    if(currentUer.length == 0 || currentUer[0] == undefined){
        return res.status(UNAUTHORIZE_ERROR_CODE).json({message: UNAUTHORIZE_ERROR_MSG});
    }
    if(currentUer[0].blocked){
        return res.status(FROBIDDEN_ERROR_CODE).json({message: FROBIDDEN_ERROR_ERROR_MSG});
    }
    next();
}

module.exports = authorize;