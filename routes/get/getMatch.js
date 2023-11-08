const getData = require("../../functions/getData");

const getMatch = async (req, resp) => {
    const { id } = req.params;
    try {
        const res = await getData(null, "matches", "_id=" + id);
        resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: getMatch.js:7 ~ getMatch ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getMatch;
