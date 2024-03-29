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

        if (teamA.anouncedPlayers && teamB.anouncedPlayers) {
            teamA.anouncedPlayers =
                teamA.anouncedPlayers && JSON.parse(teamA.anouncedPlayers);
            teamA.subsitutePlayers =
                teamA.subsitutePlayers && JSON.parse(teamA.subsitutePlayers);

            teamB.anouncedPlayers =
                teamB.anouncedPlayers && JSON.parse(teamB.anouncedPlayers);
            teamB.subsitutePlayers =
                teamB.subsitutePlayers && JSON.parse(teamB.subsitutePlayers);

            teamA.nPlayers = JSON.parse(teamA.players).filter(
                (i) =>
                    !teamA.anouncedPlayers.includes(i) &&
                    !teamA.subsitutePlayers.includes(i)
            );

            teamB.nPlayers = JSON.parse(teamB.players).filter(
                (i) =>
                    !teamB.anouncedPlayers.includes(i) &&
                    !teamB.subsitutePlayers.includes(i)
            );

            teamA.players = [
                ...teamA.anouncedPlayers,
                ...teamA.subsitutePlayers,
            ];
            teamB.players = [
                ...teamB.anouncedPlayers,
                ...teamB.subsitutePlayers,
            ];
        } else {
            teamA.anouncedPlayers = JSON.parse(teamA.players);
            teamB.anouncedPlayers = JSON.parse(teamB.players);
            teamA.players = JSON.parse(teamA.players);
            teamB.players = JSON.parse(teamB.players);
        }

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
