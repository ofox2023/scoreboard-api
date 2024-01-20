const getData = require("../../functions/getData");

const getPlayerPoints = async (req, resp) => {
    try {
        const { match, tournament, player } = req.query;

        const {
            data: [points],
        } = await getData(null, "points", `tournament = ${tournament}`);

        const { data: score } = await getData(
            null,
            "score",
            `_match = ${match} && (batsman = ${player} || bowler = ${player} || JSON_UNQUOTE(JSON_SEARCH(extraInfo, 'one', ${player})) IS NOT NULL)`
        );

        let runs = 0,
            wicket = 0,
            six = 0,
            four = 0,
            bowled = 0,
            lbw = 0,
            caught = 0,
            stumping = 0,
            runOutDirectThrow = 0,
            runOutThrowPassed = 0,
            _2Wickets = 0,
            _3Wickets = 0,
            _50 = 0,
            _100 = 0;

        let totalPoints = 0,
            totalEvents = 0;

        const _points = {
            runs: 0,
            wicket: 0,
            six: 0,
            four: 0,
            bowled: 0,
            lbw: 0,
            caught: 0,
            stumping: 0,
            runOutDirectThrow: 0,
            runOutThrowPassed: 0,
            _2Wickets: 0,
            _3Wickets: 0,
            _50: 0,
            _100: 0,
        };

        score.forEach((i) => {
            if (i.result !== "Dott Ball" && i.bowler == player)
                wicket += i.wicket;

            if (i.batsman == player) {
                const [sp0, sp1] = i.result.split(" ");

                if (
                    i.run &&
                    sp0 !== "WD" &&
                    i.result !== "NB" &&
                    sp0 !== "BY" &&
                    sp0 !== "LB"
                ) {
                    runs += sp0 === "NB" ? i.run - 1 : i.run;
                    if (i.result === "Six") six += 1;
                    if (i.result === "Four") four += 1;
                }
            }

            if (i.result === "Bowled" && i.batsman != player) bowled += 1;

            if (i.result === "LBW" && i.batsman != player) lbw += 1;

            if (i.extraInfo) {
                const js = JSON.parse(i.extraInfo);
                if (js.whoCaught == player) caught += 1;

                if (js.whoPass == null && js.whoThrow == player)
                    runOutDirectThrow += 1;

                if (
                    js.whoPass != null &&
                    (js.whoThrow == player || js.whoPass == player)
                )
                    runOutThrowPassed += 1;

                if (js.wicketKeeper == player) stumping += 1;
            }
        });

        if (runs >= 50) _50 = 1;
        if (runs >= 100) _100 = 1;

        const events = {
            runs,
            four,
            six,
            bowled,
            lbw,
            caught,
            wicket,
            stumping,
            runOutDirectThrow,
            runOutThrowPassed,
            _100,
            _50,
            _2Wickets,
            _3Wickets,
        };

        _points.runs = runs * points.runs;
        _points.four = four * points.four;
        _points.six = six * points.six;
        _points.bowled = bowled * points.bowled;
        _points.lbw = lbw * points.lbw;
        _points.caught = caught * points.caught;
        _points.wicket = wicket * points.wicket;
        _points.stumping = stumping * points.stumping;
        _points.runOutDirectThrow =
            runOutDirectThrow * points.runOutDirectThrow;
        _points.runOutThrowPassed =
            runOutThrowPassed * points.runOutThrowPassed;
        _points._100 = _100 * points["100"];
        _points._50 = _50 * points["50"];
        _points._2Wickets = wicket >= 2 ? points["2Wickets"] : 0;
        _points._3Wickets = wicket >= 3 ? points["3Wickets"] : 0;

        const keys = Object.keys(events);

        const finalData = {};

        keys.forEach((key) => {
            finalData[key] = { events: events[key], points: _points[key] };
            totalEvents += events[key];
        });

        Object.values(_points).forEach((p) => {
            totalPoints += p;
        });

        return resp.send({
            status: "SUCCESS",
            data: { totalPoints, totalEvents, finalData },
        });
    } catch (err) {
        console.log(
            "🚀 ~ file: getPlayerPoints.js:6 ~ getPlayerPoints ~ err:",
            err
        );
        return resp.send({ status: "FAILURE" });
    }
};

module.exports = getPlayerPoints;
