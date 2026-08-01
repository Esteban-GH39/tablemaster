import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import playerRoutes from "./modules/players/player.routes.js";
import tournamentRoutes from "./modules/tournaments/tournament.routes.js";
import entryRoutes from "./modules/entries/entry.routes.js";
import matchRoutes from "./modules/matches/match.routes.js";
import matchResultRoutes from "./modules/matchResults/matchResult.routes.js";
import competitionRoutes from "./modules/competition/competition.routes.js";
import teamRoutes from "./modules/teams/team.routes.js";
import statisticsRoutes from "./modules/statistics/statistics.routes.js";
import rankingRoutes from "./modules/ranking/ranking.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

const origenesPermitidos = (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map((url) => url.trim());

app.use(express.json());
app.use(cors({ origin: origenesPermitidos, credentials: true }));
app.use("/api/players", playerRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/tournaments", entryRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/match-results", matchResultRoutes);
app.use("/api/competition", competitionRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    message: "TableMaster API"
  });
});

export default app;