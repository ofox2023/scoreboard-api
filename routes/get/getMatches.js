const getData = require("../../functions/getData");

const getMatches = async (req, resp) => {
    const { tournament, status } = req.query;
    try {
        let res = await getData(
            null,
            "matches",
            status && `status = '${status}'`
        );

        const promise = res.data.map(async (item, i) => {
            // get tournament
            const {
                data: [tournament],
            } = await getData(null, "tournaments", `_id = ${item.tournament}`);
            res.data[i].tournamentName = tournament.name;

            // get team a
            const {
                data: [teamA],
            } = await getData(null, "teams", `_id = ${item.teamA}`);
            res.data[i].teamAFullName = teamA.fullName;
            res.data[i].teamAShortName = teamA.shortName;
            res.data[i].teamAImage = teamA.image;

            // get team b
            const {
                data: [teamB],
            } = await getData(null, "teams", `_id = ${item.teamB}`);
            res.data[i].teamBFullName = teamB.fullName;
            res.data[i].teamBShortName = teamB.shortName;
            res.data[i].teamBImage = teamB.image;

            if (item.status === "Live") {
                const bettingTeam =
                    item.tossWinner === "teamA"
                        ? item.tossWinnerTeamChoice === "Betting"
                            ? "teamA"
                            : "teamB"
                        : item.tossWinnerTeamChoice === "Betting"
                        ? "teamB"
                        : "teamA";

                res.data[i].bettingTeam = bettingTeam;
            }
            return res.data[i];
        });

        Promise.all(promise).then(() =>
            resp.send({ status: "SUCCESS", data: res.data })
        );
    } catch (err) {
        console.log("🚀 ~ file: getMatches.js:7 ~ getMatches ~ err:", err);
        return resp.send({ status: "FAILURE" });
    }
};

module.exports = getMatches;
