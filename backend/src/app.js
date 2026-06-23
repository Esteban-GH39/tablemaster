import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import playerRoutes from "./modules/players/player.routes.js";
import tournamentRoutes from "./modules/tournaments/tournament.routes.js";
import entryRoutes from "./modules/entries/entry.routes.js";
import matchRoutes from "./modules/matches/match.routes.js";
import competitionRoutes from ".modules/competition/competition.routes.js";
import teamRoutes from "./modules/teams/team.routes.js";

const app = express();

app.use(express.json());
app.use("/api/players", playerRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/tournaments", entryRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/competition", competitionRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    message: "TableMaster API"
  });
});



export default app;