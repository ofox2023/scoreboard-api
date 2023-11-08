const getData = require("../../functions/getData");

const getPlayer = async (req, resp) => {
    const { id } = req.params;
    try {
        const res = await getData(null, "players", "_id=" + id);
        resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: getPlayer.js:7 ~ getPlayer ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getPlayer;
