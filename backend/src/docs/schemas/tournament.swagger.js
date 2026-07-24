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
                ]
            },
            max_players: {
                type: "integer",
                minimum: 2,
                example: 32
            },
            champion_id: {
                type: "string",
                format: "uuid",
                nullable: true
            },
            runner_up_id: {
                type: "string",
                format: "uuid",
                nullable: true
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
    },

    TournamentCreate: {
        type: "object",
        required: [
            "name",
            "location",
            "startDate",
            "endDate",
            "maxPlayers"
        ],
        properties: {
            name: {
                type: "string",
                example: "Open Medellín 2026"
            },
            description: {
                type: "string",
                example: "Torneo nacional"
            },
            location: {
                type: "string",
                example: "Medellín"
            },
            startDate: {
                type: "string",
                format: "date",
                example: "2026-08-01"
            },
            endDate: {
                type: "string",
                format: "date",
                example: "2026-08-03"
            },
            maxPlayers: {
                type: "integer",
                example: 32
            }
        }
    },

    TournamentUpdate: {
        type: "object",
        properties: {
            name: {
                type: "string"
            },
            description: {
                type: "string"
            },
            location: {
                type: "string"
            },
            startDate: {
                type: "string",
                format: "date"
            },
            endDate: {
                type: "string",
                format: "date"
            },
            status: {
                type: "string",
                enum: [
                    "draft",
                    "registration",
                    "in_progress",
                    "finished",
                    "cancelled"
                ]
            },
            maxPlayers: {
                type: "integer"
            }
        }
    }
};