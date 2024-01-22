const getData = require("../../functions/getData");

const getMatchPlayers = async (req, resp) => {
    try {
        const { match } = req.params;

        const {
            data: [matchData],
        } = await getData(null, "matches", `_id = ${match}`);

        const {
            data: [teamA],
        } = await getData(null, "teams", `_id = ${matchData.teamA}`);

        const {
            data: [teamB],
        } = await getData(null, "teams", `_id = ${matchData.teamB}`);

        teamA.players = [
            ...JSON.parse(teamA.anouncedPlayers),
            ...JSON.parse(teamA.subsitutePlayers),
        ];
        teamB.players = [
            ...JSON.parse(teamB.anouncedPlayers),
            ...JSON.parse(teamB.subsitutePlayers),
        ];

        const teamAPlayers = [];

        teamA.players.forEach(async (item, index) => {
            const {
                data: [player],
            } = await getData(null, "players", `_id = ${item}`);
            teamAPlayers[index] = player;

            if (index === teamA.players.length - 1) getTeamBPlayers();
        });

        const teamBPlayers = [];

        const getTeamBPlayers = () => {
            teamB.players.forEach(async (item, index) => {
                const {
                    data: [player],
                } = await getData(null, "players", `_id = ${item}`);
                teamBPlayers[index] = player;

                if (index === teamB.players.length - 1) {
                    teamA.players = teamAPlayers;
                    teamB.players = teamBPlayers;

                    const data = {
                        teamA,
                        teamB,
                    };

                    return resp.send({ status: "SUCCESS", data });
                }
            });
        };
    } catch (err) {
        console.log(
            "🚀 ~ file: getMatchPlayers.js:5 ~ getMatchPlayers ~ err:",
            err
        );
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getMatchPlayers;
