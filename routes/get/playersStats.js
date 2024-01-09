const { default: axios } = require("axios");
const orderBy = require("lodash.orderby");

const getData = require("../../functions/getData");

const playersStats = async (req, resp) => {
    try {
        const { match } = req.params;

        const {
            data: [matchData],
        } = await getData(null, "matches", `_id = ${match}`);

        const tournament = matchData.tournament;

        const {
            data: [teamA],
        } = await getData(null, "teams", `_id = ${matchData.teamA}`);

        const {
            data: [teamB],
        } = await getData(null, "teams", `_id = ${matchData.teamB}`);

        teamA.players = JSON.parse(teamA.players);
        teamB.players = JSON.parse(teamB.players);

        const teamAPlayers = [];

        teamA.players.forEach(async (item, index) => {
            const {
                data: [player],
            } = await getData(null, "players", `_id = ${item}`);

            const {
                data: { data: points },
            } = await axios.get(
                `http://13.48.29.162/player-points?tournament=${tournament}&match=${match}&player=${item}`
            );

            player.points = points;

            player.team = teamA;

            teamAPlayers[index] = player;

            if (index === teamA.players.length - 1) getTeamBPlayers();
        });

        const teamBPlayers = [];

        const getTeamBPlayers = () => {
            teamB.players.forEach(async (item, index) => {
                const {
                    data: [player],
                } = await getData(null, "players", `_id = ${item}`);

                const {
                    data: { data: points },
                } = await axios.get(
                    `http://13.48.29.162/player-points?tournament=${tournament}&match=${match}&player=${item}`
                );

                player.points = points;

                player.team = teamB;

                teamBPlayers[index] = player;

                if (index === teamB.players.length - 1) {
                    let data = [...teamAPlayers, ...teamBPlayers];

                    data = orderBy(data, "points.totalPoints", "desc");

                    return resp.send({ status: "SUCCESS", data });
                }
            });
        };
    } catch (err) {
        console.log("🚀 ~ file: playersStats.js:5 ~ playersStats ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = playersStats;
