const express = require("express");
const cors = require("cors");
const fu = require("express-fileupload");

const getCategories = require("./routes/get/getCategories");
const getTournaments = require("./routes/get/getTournaments");
const getTournament = require("./routes/get/getTournament");
const getGrounds = require("./routes/get/getGrounds");
const getGround = require("./routes/get/getGround");
const getTeams = require("./routes/get/getTeams");
const getTeam = require("./routes/get/getTeam");
const getPlayers = require("./routes/get/getPlayers");
const getPlayer = require("./routes/get/getPlayer");
const getMatches = require("./routes/get/getMatches");
const getMatch = require("./routes/get/getMatch");
const getLiveResult = require("./routes/get/getLiveResult");

const addCategory = require("./routes/post/addCategory");
const fileUpload = require("./routes/post/fileUpload");
const addTournament = require("./routes/post/addTournament");
const addGround = require("./routes/post/addGround");
const addTeam = require("./routes/post/addTeam");
const addPlayer = require("./routes/post/addPlayer");
const addMatch = require("./routes/post/addMatch");
const addResult = require("./routes/post/addResult");
const getLiveScore = require("./routes/get/getLiveScore");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(fu());
app.use("/files", express.static("./files"));

app.listen(process.env.PORT || 8000);

// get routes
app.get("/", (req, resp) => {
    resp.send("Hello from server");
});
app.get("/categories", getCategories);
app.get("/tournaments", getTournaments);
app.get("/tournament/:id", getTournament);
app.get("/grounds", getGrounds);
app.get("/ground/:id", getGround);
app.get("/teams", getTeams);
app.get("/team/:id", getTeam);
app.get("/players", getPlayers);
app.get("/player/:id", getPlayer);
app.get("/matches", getMatches);
app.get("/match/:id", getMatch);
app.get("/live-result", getLiveResult);
app.get("/live-score/:id", getLiveScore);

// post routes
app.post("/category/add", addCategory);
app.post("/file/upload", fileUpload);
app.post("/tournament/add", addTournament);
app.post("/ground/add", addGround);
app.post("/team/add", addTeam);
app.post("/player/add", addPlayer);
app.post("/match/add", addMatch);
app.post("/result/add", addResult);
