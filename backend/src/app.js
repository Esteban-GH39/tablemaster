import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import playerRoutes from "./modules/players/player.routes.js";
import tournamentRoutes from "./modules/tournaments/tournament.routes.js";
import tournamentPlayerRoutes from "./modules/tournamentPlayer/tournamentPlayer.routes.js";


const app = express();

app.use(express.json());
app.use("/api/players", playerRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/tournaments", tournamentPlayerRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    message: "TableMaster API"
  });
});



export default app;