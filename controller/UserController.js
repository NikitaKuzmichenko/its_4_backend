const repo = require("../repository/UserRepo")
const cookieService = require("../service/CookieService")
const ConstraintViolationError = require("../repository/error/ConstraintViolationError");

const NOT_FOUND_ERROR_CODE = 404;
const UNAUTHORIZED_ERROR_CODE = 401;
const BAD_REQUEST_ERROR_CODE = 400;
const NOT_FOUND_ERROR_MSG = "Requested entity not found";
const CREATED_SUCCESS_CODE = 201;
const OK_SUCCESS_CODE = 200;

// function isCredentilasMath(req,res,users,credentials){
//     if(users.length == 0 || users[0].password != credentials.password || users[0].blocked){
//         res.status(UNAUTHORIZED_ERROR_CODE);
//         res.json();
//     }
//     else{
//         cookieService.setUserId(res,users[0].id);
//         res.status(OK_SUCCESS_CODE);
//         res.json(users[0]);
//     }
// }

function isCredentilasMath(users,credentials){
    return users.length == 0 || users[0].password != credentials.password
}

class UserController{

    async authenticate(req,res,next){
        try{ 
            const result = await repo.getByEmail(req.body.email);
            if(!isCredentilasMath ||  result[0].blocked){
                res.status(UNAUTHORIZED_ERROR_CODE);
                res.json();
            }else{
                const date = new Date();
                result[0].last_login_date = date;
                await repo.updateLoginDate(result[0].id,date)
                cookieService.setUserId(res,result[0].id);
                res.status(OK_SUCCESS_CODE);
                res.json(result[0]);
            }
        }catch(error){
            next(error);
        }
    }
    
    async create(req,res,next){
        try{
            res.status(CREATED_SUCCESS_CODE).json(await repo.create(req.body));
            next();
        }catch(error){
            if(error instanceof ConstraintViolationError){
                res.status(BAD_REQUEST_ERROR_CODE);
            }
            next(error);
        }
    }

    async getById(req,res,next){
        try{
            const result = await repo.getById(req.params.userId);
            if(result.length == 0){
                res.status(NOT_FOUND_ERROR_CODE).json({message: NOT_FOUND_ERROR_MSG});
            }else{
                res.json(result)
            }
        }catch(error){
            next(error);
        }
    }

    async getAll(req,res,next){
        try{
            res.json((await repo.getAll()));
        }catch(error){
            next(error);
        }
    }

    async deleteAll(req,res,next){
        try{
            res.json((await repo.deleteAllById(req.body)));
        }catch(error){
            next(error);
        }
    }

    async blockAll(req,res,next){
        try{
            res.json((await repo.setBlockedValueForAll(req.body,true)));
        }catch(error){
            next(error);
        }
    }

    async unblockAll(req,res,next){
        try{
            res.json((await repo.setBlockedValueForAll(req.body,false)));
        }catch(error){
            next(error);
        }
    }

    async logOut(req,res,next){
        cookieService.removeUserId(res);
        res.json();
        next();
    }
};

module.exports = new UserController();