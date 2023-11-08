const getData = require("../../functions/getData");

const getTeams = async (req, resp) => {
    const { category } = req.query;
    try {
        const res = await getData(
            null,
            "teams",
            category && `category = ${category}`
        );
        resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: getTeams.js:7 ~ getTeams ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getTeams;
