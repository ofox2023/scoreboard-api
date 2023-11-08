const addData = require("../../functions/addData");

const addTournament = async (req, resp) => {
    try {
        await addData(req.body, "tournaments");
        resp.send({ status: "SUCCESS" });
    } catch (err) {
        console.log(
            "🚀 ~ file: addTournament.js:5 ~ addTournament ~ err:",
            err
        );
        resp.send({ status: "FAILURE" });
    }
};

module.exports = addTournament;
