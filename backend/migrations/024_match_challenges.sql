ALTER TABLE matches
    ALTER COLUMN match_order DROP NOT NULL;

ALTER TABLE matches
    ADD COLUMN IF NOT EXISTS challenged_by UUID;

ALTER TABLE matches
    ADD COLUMN IF NOT EXISTS proposed_sets JSONB;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_matches_challenged_by'
    ) THEN
        ALTER TABLE matches
            ADD CONSTRAINT fk_matches_challenged_by
            FOREIGN KEY (challenged_by)
            REFERENCES players(id)
            ON DELETE SET NULL;
    END IF;
END $$;

ALTER TABLE matches
    DROP CONSTRAINT IF EXISTS matches_status_check;

ALTER TABLE matches
    ADD CONSTRAINT matches_status_check
    CHECK (
        status IN
        (
            'pending',
            'in_progress',
            'finished',
            'walkover',
            'cancelled',
            'awaiting_confirmation'
        )
    );
