const db = require("./db");

const addData = (data, table, q) =>
    new Promise(async (resolve, reject) => {
        let query = `insert into ${table} set ?`;

        if (q) {
            query += ` where ${q}`;
        }

        if (data._id) {
            query = `update ${table} set ? where _id=${data._id}`;
        }

        delete data._id;

        db.query(query, data, (err, res) => {
            if (err) {
                console.log("🚀 ~ file: addData.js:19 ~ db.query ~ err:", err);
                return reject({ status: "FAILURE" });
            } else {
                return resolve({
                    status: "SUCCESS",
                    ...(!data._id && { data: { _id: res.insertId } }),
                });
            }
        });
    });

module.exports = addData;
