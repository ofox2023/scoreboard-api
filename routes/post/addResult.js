const addData = require("../../functions/addData");

const addResult = async (req, resp) => {
    try {
        const res = await addData(req.body, "score");
        resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: addResult.js:5 ~ addResult ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = addResult;
