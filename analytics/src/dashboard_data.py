from database import run_query


def matches_dataset():
    sql = """
        SELECT
            m.id AS match_id,
            t.name AS tournament_name,
            m.round,
            p1.full_name AS player_one_name,
            p2.full_name AS player_two_name,
            w.full_name AS winner_name,
            m.status,
            m.played_at
        FROM matches m
        JOIN tournaments t ON t.id = m.tournament_id
        LEFT JOIN players p1 ON p1.id = m.player_one_id
        LEFT JOIN players p2 ON p2.id = m.player_two_id
        LEFT JOIN players w ON w.id = m.winner_id
        ORDER BY t.name, m.round_order, m.match_order;
    """
    return run_query(sql)


def players_dataset():
    sql = """
        SELECT
            p.id AS player_id,
            p.full_name,
            p.club,
            p.age,
            p.gender,
            p.dominant_hand,
            COALESCE(SUM(s.matches_played), 0) AS matches_played,
            COALESCE(SUM(s.matches_won), 0) AS matches_won,
            COALESCE(SUM(s.matches_lost), 0) AS matches_lost,
            CASE
                WHEN COALESCE(SUM(s.matches_played), 0) = 0 THEN 0
                ELSE ROUND(
                    100.0 * SUM(s.matches_won) / SUM(s.matches_played), 2
                )
            END AS win_rate_percent
        FROM players p
        LEFT JOIN statistics s ON s.player_id = p.id
        GROUP BY p.id, p.full_name, p.club, p.age, p.gender, p.dominant_hand
        ORDER BY win_rate_percent DESC;
    """
    return run_query(sql)


if __name__ == "__main__":

    print("\n--- Matches dataset ---")
    print(matches_dataset())

    print("\n--- Players dataset ---")
    print(players_dataset())