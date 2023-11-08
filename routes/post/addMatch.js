const addData = require("../../functions/addData");

const addMatch = async (req, resp) => {
    try {
        const res = await addData(req.body, "matches");
        resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: addMatch.js:5 ~ addMatch ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = addMatch;
