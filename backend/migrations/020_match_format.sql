ALTER TABLE matches
    ADD COLUMN sets_to_win SMALLINT NOT NULL DEFAULT 3
    CHECK (sets_to_win IN (2, 3, 4));
