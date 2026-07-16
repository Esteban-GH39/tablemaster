CREATE TABLE competitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID NOT NULL,
    format VARCHAR(30) NOT NULL
        CHECK
        (
            format IN
            (
                'round_robin',
                'single_elimination',
                'double_elimination',
                'groups_knockout'
            )
        ),
    current_stage VARCHAR(30)
        DEFAULT 'registration',
    status VARCHAR(20)
        DEFAULT 'pending'
        CHECK
        (
            status IN
            (
                'pending',
                'running',
                'finished'
            )
        ),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_competition_tournament
        FOREIGN KEY (tournament_id)
        REFERENCES tournaments(id)
        ON DELETE CASCADE
);