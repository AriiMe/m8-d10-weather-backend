const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

const getData = async (lat, lon, successCallback) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=125e0bd3302b64278d69cc208ddcd956`
    )
        .then((response) => response.json())
        .then((data) => {
            successCallback(data);
        });
};

router.route("/").get(async (req, res, next) => {
    try {

        res.send("ok");
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
