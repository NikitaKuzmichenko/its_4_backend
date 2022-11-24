require('dotenv').config();
const express = require('express');
const cors = require('cors')
const corsOptions = require("./configuration/Cors")
const bodyParser = require('body-parser');
const router = require('./router/Router');
const errorHanler = require("./middleware/ErrorHandler")
const session = require("express-session")
const sessionOptions = require("./configuration/Session")
const cookieParser = require("cookie-parser")

const app = express();
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(bodyParser.json());
app.use(router);
//app.use(errorHanler);
app.listen(process.env.PORT);