export const competitionSchemas = {
    Competition: {
        type: "object",
        description: "Competition associated with a tournament.",
        required: [
            "id",
            "tournament_id",
            "format",
            "current_stage",
            "status",
            "created_at",
            "updated_at"
        ],
        properties: {
            id: {
                type: "string",
                format: "uuid",
                example: "8c6db6b5-c2cf-4b44-b2b0-f28a7b7e56d3"
            },
            tournament_id: {
                type: "string",
                format: "uuid",
                example: "bfcdaad1-cfd5-43b2-8463-954f2b1910ea"
            },
            format: {
                type: "string",
                enum: [
                    "round_robin",
                    "single_elimination",
                    "double_elimination",
                    "groups_knockout"
                ],
                example: "groups_knockout"
            },
            current_stage: {
                type: "string",
                enum: [
                    "registration",
                    "groups",
                    "knockout",
                    "finished"
                ],
                example: "groups"
            },
            status: {
                type: "string",
                enum: [
                    "pending",
                    "running",
                    "finished"
                ],
                example: "running"
            },
            created_at: {
                type: "string",
                format: "date-time",
                example: "2026-07-18T20:15:10.000Z"
            },
            updated_at: {
                type: "string",
                format: "date-time",
                example: "2026-07-18T21:42:55.000Z"
            }
        }
    },
    CompetitionCreate: {
        type: "object",
        required: [
            "tournament_id",
            "format"
        ],
        properties: {
            tournament_id: {
                type: "string",
                format: "uuid"
            },
            format: {
                type: "string",
                enum: [
                    "round_robin",
                    "single_elimination",
                    "double_elimination",
                    "groups_knockout"
                ]
            }
        }
    },

    CompetitionUpdate: {
        type: "object",
        properties: {
            format: {
                type: "string",
                enum: [
                    "round_robin",
                    "single_elimination",
                    "double_elimination",
                    "groups_knockout"
                ]
            },
            current_stage: {
                type: "string",
                enum: [
                    "registration",
                    "groups",
                    "knockout",
                    "finished"
                ]
            },
            status: {
                type: "string",
                enum: [
                    "pending",
                    "running",
                    "finished"
                ]
            }
        }
    }
};