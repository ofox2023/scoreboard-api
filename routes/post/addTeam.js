const addData = require("../../functions/addData");

const addTeam = async (req, resp) => {
    try {
        const res = await addData(req.body, "teams");
        resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: addTeam.js:5 ~ addTeam ~ err:", err);
        resp.send({ status: "FAILURE", message: err });
    }
};

module.exports = addTeam;
