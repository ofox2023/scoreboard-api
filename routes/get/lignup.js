const { io } = require("../../functions/server");

const lignup = (req, resp) => {
    io.emit("live", req.params.match);
    resp.send({ status: "SUCCESS" });
};

module.exports = lignup;
