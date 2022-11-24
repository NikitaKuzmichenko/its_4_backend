const DAY = 1000 * 60 * 60 * 24;
const SECRET = "thisismysecrctekeyfhrgfgrfrty84fwir767"
// const options = {
//     secret: SECRET,
//     saveUninitialized:false,
//     cookie: { maxAge: DAY},
//     resave: false,
//     cookie: {
//         secure: true,
//         httpOnly: false,
//         sameSite: 'none',
//         maxAge: DAY * 30
//     }
// };

const options = {
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: DAY },
    resave: false,
        cookie: {
        secure: true,
        httpOnly: false,
        sameSite: 'none',
        maxAge: DAY * 30
    }
};

module.exports = options ;