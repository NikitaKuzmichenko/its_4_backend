const USER_ID_PROPERTY_NAME = "user_id";

class SessionService{

    setUserId(res,id){
        res.cookie(USER_ID_PROPERTY_NAME,id);
    }

    getUserId(req){
        return req.cookies.user_id;
    }

    removeUserId(res){
        res.clearCookie(USER_ID_PROPERTY_NAME);
    }
}

module.exports = new SessionService();