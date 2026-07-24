export const stageSchemas = {
    Stage: {
        type: "object",
        description: "Competition stage.",
        required: [
            "id",
            "competition_id",
            "stage_type",
            "status",
            "created_at"
        ],
        properties: {
            id: {
                type: "string",
                format: "uuid",
                example: "d81cf487-24fd-4863-8053-02668ae4f816"
            },
            competition_id: {
                type: "string",
                format: "uuid",
                example: "8c6db6b5-c2cf-4b44-b2b0-f28a7b7e56d3"
            },
            stage_type: {
                type: "string",
                enum: [
                    "groups",
                    "knockout"
                ]
            },
            status: {
                type: "string",
                enum: [
                    "pending",
                    "running",
                    "finished"
                ]
            },
            created_at: {
                type: "string",
                format: "date-time"
            }
        }
    },

    StageCreate: {
        type: "object",
        required: [
            "competition_id",
            "stage_type"
        ],
        properties: {
            competition_id: {
                type: "string",
                format: "uuid"
            },
            stage_type: {
                type: "string",
                enum: [
                    "groups",
                    "knockout"
                ]
            }
        }
    },

    StageUpdate: {
        type: "object",
        properties: {
            stage_type: {
                type: "string",
                enum: [
                    "groups",
                    "knockout"
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