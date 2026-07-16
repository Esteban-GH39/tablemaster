CREATE TABLE players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL
        CHECK(age >= 4),
    gender VARCHAR(20) NOT NULL,
        CHECK(gender IN ('male', 'female')),
    club VARCHAR(100),
    ranking_points INTEGER NOT NULL DEFAULT 0,
    dominant_hand VARCHAR(10) NOT NULL,
        CHECK(dominant_hand IN ('left', 'right')),
    play_style VARCHAR(50),
        CHECK(play_style IN ('aggressive', 'defensive', 'all-round')),
    grip_type VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);