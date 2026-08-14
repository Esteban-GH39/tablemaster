import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

import kpis
import dashboard_data
import predictions

load_dotenv()

app = FastAPI(
    title="TableMaster Analytics",
    description="KPIs, datasets y predicciones para TableMaster.",
    version="1.0.0",
)

origenes_permitidos = [
    origen.strip()
    for origen in os.getenv("FRONTEND_URL", "http://localhost:5173").split(",")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origenes_permitidos,
    allow_methods=["GET"],
    allow_headers=["*"],
)


def df_to_json(df):
    """Convierte un DataFrame de pandas en algo que FastAPI pueda serializar."""
    return df.to_dict(orient="records")

_model = None
_model_accuracy = None
_model_error = None

try:
    _model, _model_accuracy = predictions.train_model()
except Exception as error:
    _model_error = str(error)


@app.get("/")
def root():
    return {"message": "TableMaster Analytics API"}


@app.get("/api/analytics/kpis")
def get_kpis():
    try:
        return {
            "totalPlayers": df_to_json(kpis.total_players())[0]["total_players"],
            "tournamentsByStatus": df_to_json(kpis.tournaments_by_status()),
            "matchesByStatus": df_to_json(kpis.matches_by_status()),
            "averageSets": df_to_json(kpis.average_sets_per_match())[0],
            "playersByDominantHand": df_to_json(kpis.players_by_dominant_hand()),
        }
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


@app.get("/api/analytics/top-players")
def get_top_players(limit: int = 10):
    try:
        return df_to_json(kpis.top_players_by_wins(limit=limit))
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


@app.get("/api/analytics/players")
def get_players_dataset():
    try:
        return df_to_json(dashboard_data.players_dataset())
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


@app.get("/api/analytics/matches")
def get_matches_dataset():
    try:
        df = dashboard_data.matches_dataset()
        if "played_at" in df.columns:
            df["played_at"] = df["played_at"].astype(str)
        return df_to_json(df)
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


@app.get("/api/analytics/predictions/status")
def get_model_status():
    """Le dice al frontend si el modelo está listo para usarse o no."""
    return {
        "ready": _model is not None,
        "accuracy": _model_accuracy,
        "error": _model_error,
    }


@app.get("/api/analytics/predictions/match")
def predict_match(player_one_id: str, player_two_id: str):
    if _model is None:
        raise HTTPException(
            status_code=503,
            detail="Prediction model is not ready yet "
                   f"({_model_error or 'not enough finished matches to train it'}).",
        )

    players = dashboard_data.players_dataset()

    row_one = players[players["player_id"].astype(str) == player_one_id]
    row_two = players[players["player_id"].astype(str) == player_two_id]

    if row_one.empty or row_two.empty:
        raise HTTPException(status_code=404, detail="Player not found")

    win_rate_one = float(row_one.iloc[0]["win_rate_percent"])
    win_rate_two = float(row_two.iloc[0]["win_rate_percent"])

    probability_one_wins = predictions.predict_match(_model, win_rate_one, win_rate_two)

    return {
        "playerOneWinProbability": probability_one_wins,
        "playerTwoWinProbability": round(100 - probability_one_wins, 2),
        "modelAccuracy": _model_accuracy,
    }
