AlTER TABLE users
    ADD COLUMN reset_password_token TEXT,
    ADD COLUMN reset_password_expires TIMESTAMPTZ;

CREATE INDEX idx_users_reset_password_token ON users(reset_password_token);