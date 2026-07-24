export const groupSchemas = {
    Group: {
        type: "object",
        description: "Represents a group within the group stage of a competition.",
        required: [
            "id",
            "stage_id",
            "name",
            "created_at"
        ],
        properties: {
            id: {
                type: "string",
                format: "uuid",
                example: "0f3c9b7b-7d35-46a6-a2b4-df0dd9f5d7c8"
            },
            stage_id: {
                type: "string",
                format: "uuid",
                example: "d81cf487-24fd-4863-8053-02668ae4f816"
            },
            name: {
                type: "string",
                example: "Group A"
            },
            created_at: {
                type: "string",
                format: "date-time",
                example: "2026-07-18T20:15:10.000Z"
            }
        }
    },

    GroupCreate: {
        type: "object",
        required: [
            "stage_id",
            "name"
        ],
        properties: {
            stage_id: {
                type: "string",
                format: "uuid"
            },
            name: {
                type: "string",
                example: "Group A"
            }
        }
    },

    GroupUpdate: {
        type: "object",
        properties: {
            name: {
                type: "string",
                example: "Group B"
            }
        }
    }
};