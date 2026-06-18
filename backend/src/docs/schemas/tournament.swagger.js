export const tournamentSchemas = {
    Tournament: {
        type: "object",
        properties: {
            id: {
                type: "integer",
                example: 1
            },
            name: {
                type: "string",
                example: "Liga Bogotá 2026"
            },
            description: {
                type: "string",
                example: "Primer torneo nacional del año"
            },
            location: {
                type: "string",
                example: "Bogotá"
            },
            startDate: {
                type: "string",
                format: "date",
                example: "2026-08-10"
            },
            endDate: {
                type: "string",
                format: "date",
                example: "2026-08-12"
            },
            status: {
                type: "string",
                enum: [
                    "draft",
                    "registration",
                    "ongoing",
                    "finished"
                ],
                example: "registration"
            },
            maxPlayers: {
                type: "integer",
                example: 64
            },
            createdAt: {
                type: "string",
                format: "date-time"
            },
            updatedAt: {
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
                example: "Liga Bogotá 2026"
            },
            description: {
                type: "string",
                example: "Primer torneo nacional"
            },
            location: {
                type: "string",
                example: "Bogotá"
            },
            startDate: {
                type: "string",
                format: "date",
                example: "2026-08-10"
            },
            endDate: {
                type: "string",
                format: "date",
                example: "2026-08-12"
            },
            status: {
                type: "string",
                enum: [
                    "draft",
                    "registration",
                    "ongoing",
                    "finished"
                ]
            },
            maxPlayers: {
                type: "integer",
                example: 64
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
                    "ongoing",
                    "finished"
                ]
            },
            maxPlayers: {
                type: "integer"
            }
        }
    }
};