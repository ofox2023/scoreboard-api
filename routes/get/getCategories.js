const getData = require("../../functions/getData");

const getCategories = async (req, resp) => {
    try {
        const res = await getData(null, "categories");
        resp.send(res);
    } catch (err) {
        console.log(
            "🚀 ~ file: getCategories.js:7 ~ getCategories ~ err:",
            err
        );
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getCategories;
