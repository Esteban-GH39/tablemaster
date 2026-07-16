CREATE TABLE stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID NOT NULL,
    stage_order SMALLINT NOT NULL,
    stage_type VARCHAR(30) NOT NULL
        CHECK (
            stage_type IN
            (
                'groups',
                'knockout'
            )
        ),
    name VARCHAR(100) NOT NULL,
    status VARCHAR(20)
        DEFAULT 'pending'
        CHECK (
            status IN
            (
                'pending',
                'running',
                'finished'
            )
        ),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_stage_competition
        FOREIGN KEY (competition_id)
        REFERENCES competitions(id)
        ON DELETE CASCADE
);
CREATE INDEX idx_stage_competition
ON stages(competition_id);