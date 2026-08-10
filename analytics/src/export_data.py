from pathlib import Path

from dashboard_data import matches_dataset, players_dataset
from kpis import top_players_by_wins

EXPORTS_DIR = Path(__file__).resolve().parent.parent / "exports"
EXPORTS_DIR.mkdir(exist_ok=True)


def export_to_csv(df, filename):
    path = EXPORTS_DIR / filename
    df.to_csv(path, index=False)
    print(f"Exported: {path}")


def export_all():
    export_to_csv(matches_dataset(), "matches_dataset.csv")
    export_to_csv(players_dataset(), "players_dataset.csv")
    export_to_csv(top_players_by_wins(limit=10), "top_players.csv")


if __name__ == "__main__":
    export_all()