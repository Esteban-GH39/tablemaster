-- Soporte para retos amistosos entre jugadores que necesitan confirmación
-- del rival antes de contar como resultado real.

ALTER TABLE matches
    DROP CONSTRAINT IF EXISTS matches_status_check;

ALTER TABLE matches
    ADD CONSTRAINT matches_status_check
    CHECK (
        status IN (
            'pending',
            'in_progress',
            'pending_confirmation',
            'finished',
            'walkover',
            'cancelled',
            'rejected'
        )
    );

-- Quién propuso el reto (para saber a quién NO dejar confirmar su propio resultado).
ALTER TABLE matches
    ADD COLUMN IF NOT EXISTS proposed_by_player_id UUID
        REFERENCES players(id) ON DELETE SET NULL;

-- El resultado propuesto se guarda aparte (no en match_sets) hasta que se
-- confirma. Así, si se rechaza, no queda nada "a medias" en match_sets.
CREATE TABLE IF NOT EXISTS match_result_proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID NOT NULL UNIQUE
        REFERENCES matches(id) ON DELETE CASCADE,
    sets JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
