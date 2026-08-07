ALTER TABLE matches
    ALTER COLUMN tournament_id DROP NOT NULL;

ALTER TABLE matches
    ALTER COLUMN stage_id DROP NOT NULL;

ALTER TABLE matches
    ALTER COLUMN round_order DROP NOT NULL;
