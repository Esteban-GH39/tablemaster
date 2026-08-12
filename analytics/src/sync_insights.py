from datetime import datetime, timezone

from database import get_connection
from dashboard_data import players_dataset
from predictions import train_model, predict_match


def sync_player_insights():
    players = players_dataset()

    connection = get_connection()
    cursor = connection.cursor()

    for _, row in players.iterrows():
        cursor.execute(
            """
            INSERT INTO player_insights
                (player_id, matches_played, matches_won, matches_lost, win_rate_percent, computed_at)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (player_id) DO UPDATE SET
                matches_played = EXCLUDED.matches_played,
                matches_won = EXCLUDED.matches_won,
                matches_lost = EXCLUDED.matches_lost,
                win_rate_percent = EXCLUDED.win_rate_percent,
                computed_at = EXCLUDED.computed_at;
            """,
            (
                row["player_id"],
                int(row["matches_played"]),
                int(row["matches_won"]),
                int(row["matches_lost"]),
                float(row["win_rate_percent"]),
                datetime.now(timezone.utc),
            ),
        )

    connection.commit()
    cursor.close()
    connection.close()
    print(f"player_insights updated: {len(players)} players")


def sync_match_predictions():
    model, accuracy = train_model()
    win_rates = players_dataset().set_index("player_id")["win_rate_percent"]

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT id, player_one_id, player_two_id
        FROM matches
        WHERE status = 'pending'
          AND player_one_id IS NOT NULL
          AND player_two_id IS NOT NULL;
        """
    )
    pending_matches = cursor.fetchall()

    updated = 0

    for match_id, player_one_id, player_two_id in pending_matches:

        if player_one_id not in win_rates.index or player_two_id not in win_rates.index:
            continue

        probability_one = predict_match(
            model,
            win_rates.loc[player_one_id],
            win_rates.loc[player_two_id],
        )
        probability_two = round(100 - probability_one, 2)

        cursor.execute(
            """
            INSERT INTO match_predictions
                (match_id, player_one_win_probability, player_two_win_probability, computed_at)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (match_id) DO UPDATE SET
                player_one_win_probability = EXCLUDED.player_one_win_probability,
                player_two_win_probability = EXCLUDED.player_two_win_probability,
                computed_at = EXCLUDED.computed_at;
            """,
            (match_id, probability_one, probability_two, datetime.now(timezone.utc)),
        )
        updated += 1

    connection.commit()
    cursor.close()
    connection.close()
    print(f"match_predictions updated: {updated} matches (model accuracy: {accuracy * 100:.2f}%)")


if __name__ == "__main__":
    sync_player_insights()
    sync_match_predictions()
