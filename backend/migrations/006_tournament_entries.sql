CREATE TABLE tournament_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID NOT NULL,
    player_id UUID,
    team_id UUID,
    seed INTEGER,
    registered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_entry_tournament
        FOREIGN KEY (tournament_id)
        REFERENCES tournaments(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_entry_player
        FOREIGN KEY (player_id)
        REFERENCES players(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_entry_team
        FOREIGN KEY (team_id)
        REFERENCES teams(id)
        ON DELETE CASCADE,
    CONSTRAINT unique_player_entry
        UNIQUE (tournament_id, player_id),
    CONSTRAINT unique_team_entry
        UNIQUE (tournament_id, team_id),
    CONSTRAINT check_entry
        CHECK (
            (player_id IS NOT NULL AND team_id IS NULL)
            OR
            (player_id IS NULL AND team_id IS NOT NULL)
        )
);
CREATE INDEX idx_entries_tournament
ON tournament_entries(tournament_id);