CREATE TABLE IF NOT EXISTS player_insights (
    player_id UUID PRIMARY KEY,
    matches_played INTEGER NOT NULL DEFAULT 0,
    matches_won INTEGER NOT NULL DEFAULT 0,
    matches_lost INTEGER NOT NULL DEFAULT 0,
    win_rate_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
    computed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_player_insights_player'
    ) THEN
        ALTER TABLE player_insights
            ADD CONSTRAINT fk_player_insights_player
            FOREIGN KEY (player_id)
            REFERENCES players(id)
            ON DELETE CASCADE;
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS match_predictions (
    match_id UUID PRIMARY KEY,
    player_one_win_probability NUMERIC(5,2) NOT NULL,
    player_two_win_probability NUMERIC(5,2) NOT NULL,
    computed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_match_predictions_match'
    ) THEN
        ALTER TABLE match_predictions
            ADD CONSTRAINT fk_match_predictions_match
            FOREIGN KEY (match_id)
            REFERENCES matches(id)
            ON DELETE CASCADE;
    END IF;
END $$;
