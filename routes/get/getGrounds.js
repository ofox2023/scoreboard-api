const getData = require("../../functions/getData");

const getGrounds = async (req, resp) => {
    const { country } = req.query;
    try {
        const res = await getData(
            null,
            "grounds",
            country && `country = '${country}'`
        );
        resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: getGrounds.js:7 ~ getGrounds ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getGrounds;
