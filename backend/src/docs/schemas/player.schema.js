export const playerSchema = {
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
                enum: ["male", "female"]
            },
            club: {
                type: "string",
                nullable: true,
                example: "Club Antioquia"
            },
            ranking_points: {
                type: "integer",
                example: 1250
            },
            dominant_hand: {
                type: "string",
                enum: ["left", "right"]
            },
            play_style: {
                type: "string",
                enum: [
                    "offensive",
                    "defensive",
                    "all-round"
                ]
            },
            grip_type: {
                type: "string",
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
    },

    PlayerCreate: {
        type: "object",
        required: [
            "fullName",
            "age",
            "gender",
            "club",
            "dominantHand",
            "playStyle"
        ],
        properties: {
            fullName: {
                type: "string",
                example: "Carlos Ramírez"
            },
            age: {
                type: "integer",
                example: 23
            },
            gender: {
                type: "string",
                enum: [
                    "male",
                    "female"
                ]
            },
            club: {
                type: "string",
                example: "Club Antioquia"
            },
            dominantHand: {
                type: "string",
                enum: [
                    "left",
                    "right"
                ]
            },
            playStyle: {
                type: "string",
                enum: [
                    "offensive",
                    "defensive",
                    "all-round"
                ]
            },
            gripType: {
                type: "string",
                enum: [
                    "shakehand",
                    "penhold"
                ]
            }
        }
    },

    PlayerUpdate: {
        type: "object",
        properties: {
            fullName: {
                type: "string"
            },
            age: {
                type: "integer"
            },
            gender: {
                type: "string",
                enum: [
                    "male",
                    "female"
                ]
            },
            club: {
                type: "string"
            },
            dominantHand: {
                type: "string",
                enum: [
                    "left",
                    "right"
                ]
            },
            playStyle: {
                type: "string",
                enum: [
                    "offensive",
                    "defensive",
                    "all-round"
                ]
            },
            gripType: {
                type: "string",
                enum: [
                    "shakehand",
                    "penhold"
                ]
            }
        }
    }
};