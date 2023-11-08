const getData = require("../../functions/getData");

const getTournaments = async (req, resp) => {
    const { category } = req.query;
    try {
        const res = await getData(
            null,
            "tournaments",
            category && `category = ${category}`
        );
        resp.send(res);
    } catch (err) {
        console.log(
            "🚀 ~ file: getTournaments.js:7 ~ getTournaments ~ err:",
            err
        );
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getTournaments;
