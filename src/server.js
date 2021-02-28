/** @format */

//importing
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("./passport");
const database = require("./database");

//fetching db and routers
const cityRouter = require("./routes/cities");
const weatherRouter = require("./routes/weather");
const userRouter = require("./routes/users");



const port = process.env.PORT || 8008

//server go brrrrrr
const server = express();
server.use(passport.initialize());
server.use(cookieParser());
const whitelist = ["http://localhost:3000", "http://localhost:9001"]; //only urls that can use the backend
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

server.use(cors(corsOptions));
server.use(express.json());

server.use("/users", userRouter);

server.use(
    "/list",
    passport.authenticate("jwt", { session: false }),
    cityRouter
);
server.use(
    "/weather",
    passport.authenticate("jwt", { session: false }),
    weatherRouter
);

database.sequelize.sync({ force: false }).then((result) => {
    server.listen(port, () => {
        console.log("Server is running on: " + port);
    });
});
// server.listen(port, () => {
//     console.log(port, "plebs running away")
// })