const getData = require("../../functions/getData");

const getLiveScore = async (req, resp) => {
    try {
        const { id } = req.params;

        const {
            data: [match],
        } = await getData(null, "matches", `_id = ${id}`);

        let { data: score } = await getData(null, "score", `_match = ${id}`);

        // ============================== Team A ===================================

        let teamAScore = [],
            teamARuns = 0,
            teamAWickets = 0;

        teamAScore = score.filter((d) => d.team === match.teamA);

        teamAScore.forEach((i) => {
            if (i.run && i.result !== "Dott Ball") teamARuns += i.run;
            if (i.result !== "Dott Ball") teamAWickets += i.wicket;
        });

        // console.log("TeamARuns: ", teamARuns);
        // console.log("TeamAWhickets: ", teamAWickets);

        // ============================= Team A End ===============================

        // ============================== Team B ===================================

        let teamBScore = [],
            teamBRuns = 0,
            teamBWickets = 0;

        teamBScore = score.filter((d) => d.team === match.teamB);

        teamBScore.forEach((i) => {
            if (i.run) teamBRuns += i.run;
            if (i.result !== "Dott Ball") teamBWickets += i.wicket;
        });

        // console.log("TeamBRuns: ", teamBRuns);
        // console.log("TeamBWhickets: ", teamBWickets);

        // ============================= Team B End ===============================

        // ============================= Bowler ===================================

        let bowlerOver = 0;

        let bowlerRun = 0;

        const bowlerOverData = score.filter((i) => i.bowler === match.bowler);

        let bowlerWickets = score.filter(
            (i) => i.bowler === match.bowler && i.wicket > 0
        );

        bowlerWickets = bowlerWickets.length;

        const mergedArray = [];

        for (const item of bowlerOverData) {
            if (!mergedArray.includes(item._over)) mergedArray.push(item._over);
        }

        const ballsToOvers = (balls) => {
            const overs = Math.floor(balls / 6);
            const ballsInCurrentOver = balls % 6;

            if (ballsInCurrentOver === 0) {
                return `${overs}.0`;
            } else {
                return `${overs}.${ballsInCurrentOver}`;
            }
        };

        score
            .filter((i) => i.bowler === match.bowler)
            .forEach((i) => {
                if (i.run && i.result.split(" ")[0] !== "WD")
                    bowlerRun += i.run;
            });

        bowlerOver = ballsToOvers(mergedArray.length);

        // console.log("BowlerOver: ", bowlerOver);

        // ============================= Bowler End ===============================

        // ============================= Betsman Start ============================

        let playerARun = 0,
            playerABall = 0;

        score
            .filter(
                (i) =>
                    i.batsman === match.playerA &&
                    i.result.split("")[0] !== "WD"
            )
            .forEach((i) => {
                if (i.run && i.result.split(" ")[0] !== "WD")
                    playerARun += i.run;
            });

        const playerAMergedArr = [];

        for (const item of score.filter((i) => i.batsman === match.playerA)) {
            if (!playerAMergedArr.includes(item._over))
                playerAMergedArr.push(item._over);
        }

        playerABall = playerAMergedArr.length;

        // console.log("PlayerARun: ", playerARun);
        // console.log("PlayerABall: ", playerABall);

        let playerBRun = 0,
            playerBBall = 0;

        score
            .filter((i) => i.batsman === match.playerB)
            .forEach((i) => {
                if (i.run && i.result.split(" ")[0] !== "WD")
                    playerBRun += i.run;
            });

        const playerBMergedArr = [];

        for (const item of score.filter((i) => i.batsman === match.playerB)) {
            if (!playerBMergedArr.includes(item._over))
                playerBMergedArr.push(item._over);
        }

        playerBBall = playerBMergedArr.length;

        // console.log("PlayerBRun: ", playerBRun);
        // console.log("PlayerBBall: ", playerBBall);

        // ============================= Betsman End ==============================

        const {
            data: [playerA],
        } = await getData(null, "players", `_id = ${match.playerA}`);

        const {
            data: [playerB],
        } = await getData(null, "players", `_id = ${match.playerB}`);

        const {
            data: [bowler],
        } = await getData(null, "players", `_id = ${match.bowler}`);

        const players = {};

        if (playerA) {
            players.playerA = {
                run: playerARun,
                ball: playerABall,
                fullName: playerA.fullName,
                shortName: playerA.shortName,
            };
        }

        if (playerB) {
            players.playerB = {
                run: playerBRun,
                ball: playerBBall,
                fullName: playerB.fullName,
                shortName: playerB.shortName,
            };
        }

        if (bowler) {
            players.bowler = {
                over: bowlerOver,
                fullName: bowler.fullName,
                shortName: bowler.shortName,
                wicket: bowlerWickets,
                run: bowlerRun,
            };
        }

        const {
            data: [teamA],
        } = await getData(null, "teams", `_id = ${match.teamA}`);

        const {
            data: [teamB],
        } = await getData(null, "teams", `_id = ${match.teamB}`);

        const teamAMergedArr = [];

        for (const item of score.filter((i) => i.team === match.teamA)) {
            if (!teamAMergedArr.includes(item._over))
                teamAMergedArr.push(item._over);
        }

        const teamBMergedArr = [];

        for (const item of score.filter((i) => i.team === match.teamB)) {
            if (!teamBMergedArr.includes(item._over))
                teamBMergedArr.push(item._over);
        }

        const teams = {
            teamA: {
                run: teamARuns,
                wickets: teamAWickets,
                fullName: teamA.fullName,
                shortName: teamA.shortName,
                over: ballsToOvers(teamAMergedArr.length),
            },
            teamB: {
                run: teamBRuns,
                wickets: teamBWickets,
                fullName: teamB.fullName,
                shortName: teamB.shortName,
                over: ballsToOvers(teamBMergedArr.length),
            },
        };

        return resp.send({ status: "SUCCESS", data: { players, teams } });
    } catch (err) {
        console.log("🚀 ~ file: getLiveScore.js:5 ~ getLiveScore ~ err:", err);
        return resp.send({ status: "FAILURE" });
    }
};

module.exports = getLiveScore;
