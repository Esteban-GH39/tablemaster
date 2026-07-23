export const matchSchemas = {
    Match: {
        type: "object",
        description: "Represents a table tennis match.",
        required: [
            "id",
            "tournament_id",
            "stage_id",
            "round",
            "round_order",
            "match_order",
            "status",
            "created_at",
            "updated_at"
        ],
        properties: {
            id: {
                type: "string",
                format: "uuid",
                example: "a6f7dc3c-235f-4cc4-84ae-7c591500340f"
            },
            tournament_id: {
                type: "string",
                format: "uuid",
                example: "bfcdaad1-cfd5-43b2-8463-954f2b1910ea"
            },
            stage_id: {
                type: "string",
                format: "uuid",
                example: "d81cf487-24fd-4863-8053-02668ae4f816"
            },
            group_id: {
                type: "string",
                format: "uuid",
                nullable: true,
                example: "8fb5ef86-d5b7-4eb7-9a91-0c6503d774dd"
            },
            player_one_id: {
                type: "string",
                format: "uuid",
                nullable: true,
                example: "e44b1fb8-c1b5-4f9e-8914-ce92adf9bf3b"
            },
            player_two_id: {
                type: "string",
                format: "uuid",
                nullable: true,
                example: "10d7e76d-a3e9-4456-a7df-e2acc3ecf54c"
            },
            winner_id: {
                type: "string",
                format: "uuid",
                nullable: true,
                example: "e44b1fb8-c1b5-4f9e-8914-ce92adf9bf3b"
            },
            round: {
                type: "string",
                example: "Quarterfinal"
            },
            round_order: {
                type: "integer",
                example: 1
            },
            match_order: {
                type: "integer",
                example: 2
            },
            status: {
                type: "string",
                enum: [
                    "pending",
                    "in_progress",
                    "finished",
                    "walkover",
                    "cancelled"
                ],
                example: "finished"
            },
            played_at: {
                type: "string",
                format: "date-time",
                nullable: true,
                example: "2026-07-20T19:35:22.000Z"
            },
            created_at: {
                type: "string",
                format: "date-time",
                example: "2026-07-18T14:02:11.000Z"
            },
            updated_at: {
                type: "string",
                format: "date-time",
                example: "2026-07-20T19:35:22.000Z"
            }
        }
    }
};