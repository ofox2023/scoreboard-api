const getData = require("../../functions/getData");

const getMatch = async (req, resp) => {
    const { id } = req.params;
    try {
        const res = await getData(null, "matches", "_id=" + id);

        const {
            data: [item],
        } = res;

        const {
            data: [tournament],
        } = await getData(null, "tournaments", `_id = ${item.tournament}`);

        res.data[0].tournamentName = tournament.name;

        // get team a
        const {
            data: [teamA],
        } = await getData(null, "teams", `_id = ${item.teamA}`);
        res.data[0].teamAFullName = teamA.fullName;
        res.data[0].teamAShortName = teamA.shortName;
        res.data[0].teamAImage = teamA.image;

        // get team b
        const {
            data: [teamB],
        } = await getData(null, "teams", `_id = ${item.teamB}`);
        res.data[0].teamBFullName = teamB.fullName;
        res.data[0].teamBShortName = teamB.shortName;
        res.data[0].teamBImage = teamB.image;

        console.log("item.playerA", item.playerA);

        // get player a
        if (item.playerA) {
            const {
                data: [playerA],
            } = await getData(null, "players", `_id = ${item.playerA}`);
            res.data[0].playerAFullName = playerA.fullName;
            res.data[0].playerAShortName = playerA.shortName;
            res.data[0].playerAImage = playerA.imag;
        }

        // get player b
        if (item.playerB) {
            const {
                data: [playerB],
            } = await getData(null, "players", `_id = ${item.playerB}`);
            res.data[0].playerBFullName = playerB.fullName;
            res.data[0].playerBShortName = playerB.shortName;
            res.data[0].playerBImage = playerB.image;
        }

        // get bowler
        if (item.bowler) {
            const {
                data: [bowler],
            } = await getData(null, "players", `_id = ${item.bowler}`);
            res.data[0].bowlerFullName = bowler.fullName;
            res.data[0].bowlerShortName = bowler.shortName;
            res.data[0].bowlerImage = bowler.image;
        }

        return resp.send(res);
    } catch (err) {
        console.log("🚀 ~ file: getMatch.js:7 ~ getMatch ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getMatch;
