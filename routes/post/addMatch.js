const addData = require("../../functions/addData");
const { io } = require("../../functions/server");

const addMatch = async (req, resp) => {
    try {
        delete req.body.tournamentName;
        delete req.body.teamAFullName;
        delete req.body.teamAShortName;
        delete req.body.teamAImage;
        delete req.body.teamBFullName;
        delete req.body.teamBShortName;
        delete req.body.teamBImage;
        delete req.body.playerAFullName;
        delete req.body.playerAShortName;
        delete req.body.playerAImage;
        delete req.body.playerBFullName;
        delete req.body.playerBShortName;
        delete req.body.playerBImage;
        delete req.body.bowlerFullName;
        delete req.body.bowlerShortName;
        delete req.body.bowlerImage;

        const res = await addData(req.body, "matches");

        io.emit("change", "player changed");

        return resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: addMatch.js:5 ~ addMatch ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = addMatch;
