from database import run_query

def total_players():
    sql = "SELECT COUNT(*) AS total_players FROM players;"
    return run_query(sql)


def tournaments_by_status():
    sql = """
        SELECT status, COUNT(*) AS total
        FROM tournaments
        GROUP BY status
        ORDER BY total DESC;
    """
    return run_query(sql)


def matches_by_status():
    sql = """
        SELECT status, COUNT(*) AS total
        FROM matches
        GROUP BY status
        ORDER BY total DESC;
    """
    return run_query(sql)


def top_players_by_wins(limit=10):
    sql = """
        SELECT
            p.full_name,
            SUM(s.matches_played) AS matches_played,
            SUM(s.matches_won) AS matches_won,
            SUM(s.matches_lost) AS matches_lost
        FROM statistics s
        JOIN players p ON p.id = s.player_id
        GROUP BY p.full_name
        ORDER BY matches_won DESC
        LIMIT %s;
    """
    return run_query(sql, params=(limit,))


def average_sets_per_match():
    sql = """
        SELECT
            ROUND(AVG(sets_won)::numeric, 2) AS avg_sets_won,
            ROUND(AVG(sets_lost)::numeric, 2) AS avg_sets_lost
        FROM statistics
        WHERE matches_played > 0;
    """
    return run_query(sql)


def players_by_dominant_hand():
    sql = """
        SELECT dominant_hand, COUNT(*) AS total
        FROM players
        GROUP BY dominant_hand
        ORDER BY total DESC;
    """
    return run_query(sql)


if __name__ == "__main__":

    print("\n--- Total players ---")
    print(total_players())

    print("\n--- Tournaments by status ---")
    print(tournaments_by_status())

    print("\n--- Matches by status ---")
    print(matches_by_status())

    print("\n--- Top 10 players by wins ---")
    print(top_players_by_wins())

    print("\n--- Average sets per match ---")
    print(average_sets_per_match())

    print("\n--- Players by dominant hand ---")
    print(players_by_dominant_hand())