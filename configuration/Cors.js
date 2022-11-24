const corsOptions = {
    origin: process.env.ALLOWED_ORIGIGN ,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}

module.exports = corsOptions 