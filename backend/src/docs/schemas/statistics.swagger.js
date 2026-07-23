export const statisticsSchemas = {
    Statistics: {
        type: "object",
        description: "Player statistics within a tournament.",
        required: [
            "id",
            "tournament_id",
            "player_id",
            "matches_played",
            "matches_won",
            "matches_lost",
            "sets_won",
            "sets_lost",
            "points_won",
            "points_lost",
            "created_at",
            "updated_at"
        ],
        properties: {
            id: {
                type: "string",
                format: "uuid",
                example: "be75d2af-cc30-46a7-88f7-baa30d022056"
            },
            tournament_id: {
                type: "string",
                format: "uuid",
                example: "bfcdaad1-cfd5-43b2-8463-954f2b1910ea"
            },
            player_id: {
                type: "string",
                format: "uuid",
                example: "e44b1fb8-c1b5-4f9e-8914-ce92adf9bf3b"
            },
            matches_played: {
                type: "integer",
                example: 7
            },
            matches_won: {
                type: "integer",
                example: 6
            },
            matches_lost: {
                type: "integer",
                example: 1
            },
            sets_won: {
                type: "integer",
                example: 20
            },
            sets_lost: {
                type: "integer",
                example: 8
            },
            points_won: {
                type: "integer",
                example: 256
            },
            points_lost: {
                type: "integer",
                example: 187
            },
            created_at: {
                type: "string",
                format: "date-time"
            },
            updated_at: {
                type: "string",
                format: "date-time"
            }
        }
    }
};