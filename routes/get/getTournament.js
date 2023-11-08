const getData = require("../../functions/getData");

const getTournament = async (req, resp) => {
    const { id } = req.params;
    try {
        const res = await getData(null, "tournaments", "_id=" + id);
        resp.send(res);
    } catch (err) {
        console.log(
            "🚀 ~ file: getTournament.js:7 ~ getTournament ~ err:",
            err
        );
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getTournament;
