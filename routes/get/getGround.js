const getData = require("../../functions/getData");

const getGround = async (req, resp) => {
    const { id } = req.params;
    try {
        const res = await getData(null, "grounds", "_id=" + id);
        resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: getGround.js:7 ~ getGround ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getGround;
