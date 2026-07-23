export const playerSchemas = {
    Player: {
        type: "object",
        required: [
            "id",
            "full_name",
            "age",
            "gender",
            "ranking_points",
            "dominant_hand",
            "created_at",
            "updated_at"
        ],
        properties: {
            id: {
                type: "string",
                format: "uuid",
                example: "e44b1fb8-c1b5-4f9e-8914-ce92adf9bf3b"
            },
            full_name: {
                type: "string",
                maxLength: 100,
                example: "Carlos Ramírez"
            },
            age: {
                type: "integer",
                minimum: 4,
                example: 23
            },
            gender: {
                type: "string",
                enum: ["male", "female"],
                example: "male"
            },
            club: {
                type: "string",
                maxLength: 100,
                nullable: true,
                example: "Club Antioquia"
            },
            ranking_points: {
                type: "integer",
                example: 1250
            },
            dominant_hand: {
                type: "string",
                enum: ["left", "right"],
                example: "right"
            },
            play_style: {
                type: "string",
                enum: ["offensive", "defensive", "control"],
                nullable: true,
                example: "offensive"
            },
            grip_type: {
                type: "string",
                maxLength: 50,
                nullable: true,
                example: "shakehand"
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