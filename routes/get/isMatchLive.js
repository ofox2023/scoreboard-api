const getData = require("../../functions/getData");

const isMatchLive = async (req, resp) => {
    try {
        const { match } = req.params;

        const { data } = await getData("_id", "score", `_match = ${match}`);

        return resp.send({ status: "SUCCESS", result: data.length > 0 });
    } catch (err) {
        console.log("🚀 ~ isMatchLive ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = isMatchLive;
