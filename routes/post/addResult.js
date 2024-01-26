const axios = require("axios");

const addData = require("../../functions/addData");
const { io } = require("../../functions/server");

const addResult = async (req, resp) => {
    try {
        const res = await addData(req.body, "score");
        console.log("🚀 ~ file: addResult.js:8 ~ addResult ~ res:", res);

        io.emit("result", {
            ...req.body,
            _id: res.data._id,
        });

        resp.send({ status: "SUCCESS" });
    } catch (err) {
        console.log("🚀 ~ file: addResult.js:5 ~ addResult ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = addResult;
