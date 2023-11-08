const db = require("./db");

const getData = (data, table, q) =>
    new Promise(async (resolve, reject) => {
        let query = `select ${data || "*"} from ${table}`;

        if (q) {
            query += ` where ${q}`;
        }

        db.query(query, (err, res) => {
            if (err) {
                console.log("🚀 ~ file: getData.js:13 ~ db.query ~ err:", err);
                return reject({ status: "FAILURE" });
            } else {
                return resolve({ status: "SUCCESS", data: res });
            }
        });
    });

module.exports = getData;
