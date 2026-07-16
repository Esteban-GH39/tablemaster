CREATE TABLE tournaments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(150) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL
        DEFAULT 'draft'
        CHECK
        (
            status IN
            (
                'draft',
                'registration',
                'in_progress',
                'finished',
                'cancelled'
            )
        ),
    min_players INTEGER NOT NULL
        CHECK (min_players >= 2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);