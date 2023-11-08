const addData = require("../../functions/addData");

const addPlayer = async (req, resp) => {
    try {
        addData(req.body, "players");
        resp.send({ status: "SUCCESS" });
    } catch (err) {
        console.log("🚀 ~ file: addPlayer.js:5 ~ addPlayer ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = addPlayer;
