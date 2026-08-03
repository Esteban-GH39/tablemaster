ALTER TABLE players
    ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX idx_players_user_id ON players(user_id);
