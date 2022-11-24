const db = require("../configuration/DB")
const ConstraintViolationError = require("./error/ConstraintViolationError");

const CREATE_USER = "INSERT INTO app_user (name,email,registration_date,last_login_date,blocked,password) VALUES($1,$2,$3,$4,$5,$6)";

const SELECT_FROM_USER = "SELECT * FROM app_user"
const SELCT_USER_BY_ID = SELECT_FROM_USER + " WHERE id = $1";
const SELCT_USER_BY_EMAIL = SELECT_FROM_USER + " WHERE email = $1";
const SELCT_ALL_USERS = SELECT_FROM_USER;

const DELETE_USER = "DELETE FROM app_user"
const DELETE_USER_BU_ID =  DELETE_USER + " WHERE id = $1";
const DELETE_USERS_BU_ID = DELETE_USER + " WHERE id = ANY($1)";

const UPDATE_USER = "UPDATE app_user";
const UPDATE_USERS_BLOCK_STATUS = UPDATE_USER + " SET blocked = $1 WHERE id = ANY($2)";
const UPDATE_LAST_LOGIN_DATE = UPDATE_USER + " SET last_login_date = $1 WHERE id = $2";

function throwConstraintViolationErrorifNedded(error){
    if(error.code == "23505"){
        throw new ConstraintViolationError();
    }
    else{
        throw new Error(error);
    }
}

class UserRepo {

    async create(user){
        try{
         await db.query(CREATE_USER, 
            [
                user.name,
                user.email,
                user.registration_date,
                user.last_login_date,
                user.blocked,
                user.password
            ]);
        }catch(error){
            throwConstraintViolationErrorifNedded(error);
        }
    }

    async getByEmail(email){
        return (await db.query(SELCT_USER_BY_EMAIL, [email])).rows;
    }

    async getById(id){
        return (await db.query(SELCT_USER_BY_ID, [id])).rows;
    }

    async updateLoginDate(id,date){
        return (await db.query(UPDATE_LAST_LOGIN_DATE, [date,id])).rows;
    }

    async getAll(){
        return (await db.query(SELCT_ALL_USERS)).rows;
    }

    async deleteById(id){
        return (await db.query(DELETE_USER_BU_ID, [id])).rows;
    }

    async deleteAllById(ids){
        return (await db.query(DELETE_USERS_BU_ID, [ids])).rows;
    }

    async setBlockedValueForAll(ids,isBlocked){
        return (await db.query(UPDATE_USERS_BLOCK_STATUS, [isBlocked,ids])).rows;
    } 
}

module.exports = new UserRepo();