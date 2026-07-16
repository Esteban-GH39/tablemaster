CREATE TABLE team_players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL,
    player_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_team
        FOREIGN KEY (team_id)
        REFERENCES teams(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_player
        FOREIGN KEY (player_id)
        REFERENCES players(id)
        ON DELETE CASCADE,
    CONSTRAINT unique_team_player
        UNIQUE(team_id, player_id)
);
CREATE INDEX idx_team_players_team
ON team_players(team_id);