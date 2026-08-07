CREATE TABLE IF NOT EXISTS statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

ALTER TABLE statistics ADD COLUMN IF NOT EXISTS tournament_id UUID;
ALTER TABLE statistics ADD COLUMN IF NOT EXISTS player_id UUID;
ALTER TABLE statistics ADD COLUMN IF NOT EXISTS matches_played SMALLINT NOT NULL DEFAULT 0;
ALTER TABLE statistics ADD COLUMN IF NOT EXISTS matches_won SMALLINT NOT NULL DEFAULT 0;
ALTER TABLE statistics ADD COLUMN IF NOT EXISTS matches_lost SMALLINT NOT NULL DEFAULT 0;
ALTER TABLE statistics ADD COLUMN IF NOT EXISTS sets_won SMALLINT NOT NULL DEFAULT 0;
ALTER TABLE statistics ADD COLUMN IF NOT EXISTS sets_lost SMALLINT NOT NULL DEFAULT 0;
ALTER TABLE statistics ADD COLUMN IF NOT EXISTS points_won INTEGER NOT NULL DEFAULT 0;
ALTER TABLE statistics ADD COLUMN IF NOT EXISTS points_lost INTEGER NOT NULL DEFAULT 0;
ALTER TABLE statistics ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE statistics ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM statistics WHERE tournament_id IS NULL
    ) THEN
        ALTER TABLE statistics ALTER COLUMN tournament_id SET NOT NULL;
    END IF;
    IF NOT EXISTS (
        SELECT 1 FROM statistics WHERE player_id IS NULL
    ) THEN
        ALTER TABLE statistics ALTER COLUMN player_id SET NOT NULL;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_statistics_tournament'
    ) THEN
        ALTER TABLE statistics
            ADD CONSTRAINT fk_statistics_tournament
            FOREIGN KEY (tournament_id)
            REFERENCES tournaments(id)
            ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_statistics_player'
    ) THEN
        ALTER TABLE statistics
            ADD CONSTRAINT fk_statistics_player
            FOREIGN KEY (player_id)
            REFERENCES players(id)
            ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'unique_tournament_player'
    ) THEN
        ALTER TABLE statistics
            ADD CONSTRAINT unique_tournament_player
            UNIQUE (tournament_id, player_id);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_statistics_tournament
ON statistics(tournament_id);

CREATE INDEX IF NOT EXISTS idx_statistics_player
ON statistics(player_id);