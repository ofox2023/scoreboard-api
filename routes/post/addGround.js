const addData = require("../../functions/addData");

const addGround = async (req, resp) => {
    try {
        await addData(req.body, "grounds");
        resp.send({ status: "SUCCESS" });
    } catch (err) {
        console.log("🚀 ~ file: addGround.js:5 ~ addGround ~ err:", err);
        resp.send({ status: "FAILURE", message: err });
    }
};

module.exports = addGround;
