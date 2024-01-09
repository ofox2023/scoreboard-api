const db = require("../../functions/db");

const getLiveResult = async (req, resp) => {
    try {
        const { limit, match, team } = req.query;

        const query = team
            ? `SELECT * FROM score WHERE _match = ${match} && team = ${team} ORDER BY createdAt DESC LIMIT ${
                  limit || 10
              }`
            : `SELECT * FROM score WHERE _match = ${match} ORDER BY createdAt DESC LIMIT ${
                  limit || 10
              }`;

        db.query(query, (err, res) => {
            if (err) {
                console.log(
                    "🚀 ~ file: getLiveResult.js:12 ~ getLiveResult ~ err:",
                    err
                );
                return resp.send({ status: "FAILURE" });
            } else {
                resp.send({ status: "SUCCESS", data: res });
            }
        });
    } catch (err) {
        console.log(
            "🚀 ~ file: getLiveResult.js:5 ~ getLiveREsult ~ err:",
            err
        );
        return resp.send({ status: "FAILURE" });
    }
};

module.exports = getLiveResult;
