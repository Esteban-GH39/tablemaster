export const teamSchemas = {
    Team: {
        type: "object",
        required: [
            "id",
            "name",
            "type",
            "created_at",
            "updated_at"
        ],
        properties: {
            id: {
                type: "string",
                format: "uuid",
                example: "8f5d3f20-1c6b-4f2a-a8f7-123456789abc"
            },
            name: {
                type: "string",
                maxLength: 120,
                example: "Club Bogotá TT"
            },
            type: {
                type: "string",
                enum: ["club", "selection", "school", "other"],
                example: "club"
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