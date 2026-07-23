export const tournamentSchemas = {
    Tournament: {
        type: "object",
        required: [
            "id",
            "name",
            "location",
            "start_date",
            "end_date",
            "status",
            "max_players",
            "created_at",
            "updated_at"
        ],
        properties: {
            id: {
                type: "string",
                format: "uuid",
                example: "bfcdaad1-cfd5-43b2-8463-954f2b1910ea"
            },
            name: {
                type: "string",
                maxLength: 150,
                example: "Open Medellín 2026"
            },
            description: {
                type: "string",
                nullable: true,
                example: "Torneo nacional de tenis de mesa"
            },
            location: {
                type: "string",
                maxLength: 150,
                example: "Medellín"
            },
            start_date: {
                type: "string",
                format: "date",
                example: "2026-08-01"
            },
            end_date: {
                type: "string",
                format: "date",
                example: "2026-08-03"
            },
            status: {
                type: "string",
                enum: [
                    "draft",
                    "registration",
                    "in_progress",
                    "finished",
                    "cancelled"
                ],
                example: "finished"
            },
            max_players: {
                type: "integer",
                minimum: 2,
                example: 32
            },
            champion_id: {
                type: "string",
                format: "uuid",
                nullable: true,
                example: "e44b1fb8-c1b5-4f9e-8914-ce92adf9bf3b"
            },
            runner_up_id: {
                type: "string",
                format: "uuid",
                nullable: true,
                example: "10d7e76d-a3e9-4456-a7df-e2acc3ecf54c"
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