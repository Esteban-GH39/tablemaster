CREATE TABLE match_sets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID NOT NULL,
    set_number SMALLINT NOT NULL,
    player_one_score SMALLINT NOT NULL,
    player_two_score SMALLINT NOT NULL,
    CONSTRAINT fk_set_match
        FOREIGN KEY (match_id)
        REFERENCES matches(id)
        ON DELETE CASCADE,
    CONSTRAINT unique_match_set
        UNIQUE(match_id, set_number)
);
CREATE INDEX idx_sets_match
ON match_sets(match_id);