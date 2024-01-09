const getData = require("../../functions/getData");

const getRunRate = async (req, resp) => {
    try {
        const { match, team } = req.query;

        let { data: score } = await getData(null, "score", `_match = ${match}`);

        const teamScore = score.filter((d) => d.team == team);
        const runRates = [];

        let teamRuns = 0;

        teamScore.forEach((i) => {
            if (i.run && i.result !== "Dott Ball") teamRuns += i.run;
        });

        const {
            data: [{ _over: curOver }],
        } = await getData("_over", "matches", `_id = ${match}`);

        const finalRunRate = parseFloat(
            parseInt(teamRuns) / parseFloat(curOver)
        ).toFixed(2);

        for (let over = 1; over <= Math.floor(parseFloat(curOver)); over++) {
            const overScore = teamScore.filter((i) => i._over <= over);
            let runs = 0;

            overScore.forEach((i) => {
                if (i.run && i.result !== "Dott Ball") runs += i.run;
            });

            runRates[over - 1] = {
                runs,
                over,
                runRate: parseFloat(runs / over).toFixed(2),
            };
        }

        return resp.send({
            status: "SUCCESS",
            data: { finalRunRate, runRates },
        });
    } catch (err) {
        console.log("🚀 ~ file: getRunRate.js:5 ~ getRunRate ~ err:", err);
        resp.send({ status: "FAILURE" });
    }
};

module.exports = getRunRate;
