const getData = require("../../functions/getData");

const getPlayers = async (req, resp) => {
    const { roll } = req.query;
    try {
        const res = await getData(null, "players", roll && `roll = '${roll}'`);
        resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: getPlayers.js:7 ~ getPlayers ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getPlayers;
