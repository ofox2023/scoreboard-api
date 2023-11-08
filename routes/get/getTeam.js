const getData = require("../../functions/getData");

const getTeam = async (req, resp) => {
    const { id } = req.params;
    try {
        const res = await getData(null, "teams", "_id=" + id);
        resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: getTeam.js:7 ~ getTeam ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getTeam;
