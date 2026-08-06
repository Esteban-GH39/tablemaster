DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'teams' AND column_name = 'format'
    ) THEN
        ALTER TABLE teams
            ADD COLUMN format VARCHAR(10) NOT NULL DEFAULT 'team'
            CHECK (format IN ('doubles', 'team'));
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'team_players' AND column_name = 'position'
    ) THEN
        ALTER TABLE team_players
            ADD COLUMN position INTEGER;
    END IF;
END $$;
