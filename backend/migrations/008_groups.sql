CREATE TABLE groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stage_id UUID NOT NULL,
    name VARCHAR(10) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_group_stage
        FOREIGN KEY (stage_id)
        REFERENCES stages(id)
        ON DELETE CASCADE
);
CREATE INDEX idx_groups_stage
ON groups(stage_id);