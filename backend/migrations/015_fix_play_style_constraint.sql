ALTER TABLE players
    DROP CONSTRAINT players_play_style_check;

ALTER TABLE players
    ADD CONSTRAINT players_play_style_check
    CHECK (play_style IN ('offensive', 'defensive', 'all-round'));
