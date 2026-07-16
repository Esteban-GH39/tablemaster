CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID NOT NULL,
    stage_id UUID NOT NULL,
    group_id UUID,
    player_one_id UUID,
    player_two_id UUID,
    winner_id UUID,
    round VARCHAR(30) NOT NULL,
    round_order SMALLINT NOT NULL,
    match_order SMALLINT NOT NULL,
    status VARCHAR(20)
        DEFAULT 'pending'
        CHECK (
            status IN
            (
                'pending',
                'in_progress',
                'finished',
                'walkover',
                'cancelled'
            )
        ),
    played_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_match_tournament
        FOREIGN KEY (tournament_id)
        REFERENCES tournaments(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_match_stage
        FOREIGN KEY (stage_id)
        REFERENCES stages(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_match_group
        FOREIGN KEY (group_id)
        REFERENCES groups(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_player_one
        FOREIGN KEY (player_one_id)
        REFERENCES players(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_player_two
        FOREIGN KEY (player_two_id)
        REFERENCES players(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_match_winner
        FOREIGN KEY (winner_id)
        REFERENCES players(id)
        ON DELETE SET NULL
);
CREATE INDEX idx_matches_stage
ON matches(stage_id);
CREATE INDEX idx_matches_group
ON matches(group_id);
CREATE INDEX idx_matches_round
ON matches(stage_id, round_order);
CREATE INDEX idx_matches_status
ON matches(status);