const getData = require("../../functions/getData");

const getPoints = async (req, resp) => {
    const { tournament } = req.params;
    try {
        const res = await getData(null, "points", "tournament = " + tournament);
        resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: getPoints.js:7 ~ getPoints ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getPoints;
