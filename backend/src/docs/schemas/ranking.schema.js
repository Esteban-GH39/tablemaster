export const rankingSchema = {
    Ranking: {
        type: "object",
        description: "Ranking information for a player.",
        required: [
            "id",
            "full_name",
            "club",
            "matches_played",
            "wins",
            "losses",
            "win_rate"
        ],
        properties: {
            id: {
                type: "string",
                format: "uuid",
                example: "e44b1fb8-c1b5-4f9e-8914-ce92adf9bf3b"
            },
            full_name: {
                type: "string",
                example: "Juan Pérez"
            },
            club: {
                type: "string",
                nullable: true,
                example: "Club Bogotá"
            },
            matches_played: {
                type: "integer",
                example: 14
            },
            wins: {
                type: "integer",
                example: 11
            },
            losses: {
                type: "integer",
                example: 3
            },
            win_rate: {
                type: "number",
                format: "float",
                example: 78.57
            }
        }
    }
};