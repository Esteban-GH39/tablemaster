CREATE TABLE group_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL,
    entry_id UUID NOT NULL,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    sets_won INTEGER DEFAULT 0,
    sets_lost INTEGER DEFAULT 0,
    points_won INTEGER DEFAULT 0,
    points_lost INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_group
        FOREIGN KEY (group_id)
        REFERENCES groups(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_entry
        FOREIGN KEY (entry_id)
        REFERENCES tournament_entries(id)
        ON DELETE CASCADE,
    CONSTRAINT unique_group_entry
        UNIQUE(group_id, entry_id)
);
CREATE INDEX idx_group_entries_group
ON group_entries(group_id);