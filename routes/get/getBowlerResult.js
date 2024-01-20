const db = require("../../functions/db");

const getBowlerResult = async (req, resp) => {
    try {
        const { match, over } = req.query;

        const query = `SELECT * FROM score WHERE _match = ${match} && _over <= ${over} && _over > ${Math.floor(
            parseFloat(over)
        )}`;

        db.query(query, (err, res) => {
            if (err) {
                console.log(
                    "🚀 ~ file: getBowlerResult.js:12 ~ getBowlerResult ~ err:",
                    err
                );
                return resp.send({ status: "FAILURE" });
            } else {
                resp.send({ status: "SUCCESS", data: res });
            }
        });
    } catch (err) {
        console.log(
            "🚀 ~ file: getBowlerResult.js:5 ~ getBowlerResult ~ err:",
            err
        );
        return resp.send({ status: "FAILURE" });
    }
};

module.exports = getBowlerResult;
