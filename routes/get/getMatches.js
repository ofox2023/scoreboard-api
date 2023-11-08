const getData = require("../../functions/getData");

const getMatches = async (req, resp) => {
    const { tournament, status } = req.query;
    try {
        const res = await getData(
            null,
            "matches",
            status && `status = '${status}'`
        );
        return resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: getMatches.js:7 ~ getMatches ~ err:", err);
        return resp.send({ status: "FAILURE" });
    }
};

module.exports = getMatches;
