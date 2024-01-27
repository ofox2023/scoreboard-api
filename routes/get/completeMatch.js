const addData = require("../../functions/addData");
const { io } = require("../../functions/server");

const completeMatch = async (req, resp) => {
    try {
        const { match: id } = req.params;
        const {
            data: [match],
        } = await getData(null, "matches", `_id = ${id}`);

        let { data: score } = await getData(null, "score", `_match = ${id}`);

        let teamAScore = [],
            teamARuns = 0;

        teamAScore = score.filter((d) => d.team === match.teamA);

        teamAScore.forEach((i) => {
            if (i.run && i.result !== "Dott Ball") teamARuns += i.run;
        });

        let teamBScore = [],
            teamBRuns = 0;

        teamBScore = score.filter((d) => d.team === match.teamB);

        teamBScore.forEach((i) => {
            if (i.run) teamBRuns += i.run;
        });

        const winner = teamARuns > teamBRuns ? match.teamA : match.teamB;

        await addData({ _id: id, winner, status: "Completed" }, "matches");

        io.emit("complete", id);

        resp.send({ status: "SUCCESS" });
    } catch (err) {
        console.log("🚀 ~ completeMatch ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = completeMatch;
