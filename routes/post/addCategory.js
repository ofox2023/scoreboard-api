const addData = require("../../functions/addData");

const addCategory = async (req, resp) => {
    try {
        const res = await addData(req.body, "categories");
        resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: addCategory.js:7 ~ addCategory ~ err:", err);
        return resp.send({ status: "FAILURE" });
    }
};

module.exports = addCategory;
