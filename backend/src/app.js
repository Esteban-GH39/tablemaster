import express from "express";
import playerRoutes from "./modules/players/player.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "TableMaster API"
  });
});

app.use("/api/players", playerRoutes);

export default app;