export const playerSchemas = {
    Player: {
        type: "object",
        properties: {
            id: {
                type: "integer",
                example: 1
            },
            fullName: {
                type: "string",
                example: "Esteban Girón"
            },
            age: {
                type: "integer",
                example: 23
            },
            gender: {
                type: "string",
                enum: ["male", "female"],
                example: "male"
            },
            club: {
                type: "string",
                example: "Bogotá TTC"
            },
            rankingPoints: {
                type: "integer",
                example: 1200
            },
            dominantHand: {
                type: "string",
                enum: ["right", "left"],
                example: "right"
            },
            playStyle: {
                type: "string",
                enum: ["offensive", "defensive", "all-round"],
                example: "offensive"
            },
            gripType: {
                type: "string",
                enum: ["shakehand", "penhold"],
                example: "shakehand"
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
                example: "Esteban Girón"
            },
            age: {
                type: "integer",
                example: 23
            },
            gender: {
                type: "string",
                enum: ["male", "female"]
            },
            club: {
                type: "string",
                example: "Bogotá TTC"
            },
            dominantHand: {
                type: "string",
                enum: ["right", "left"]
            },
            playStyle: {
                type: "string",
                enum: ["offensive", "defensive", "all-round"]
            },
            gripType: {
                type: "string",
                enum: ["shakehand", "penhold"]
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
                enum: ["male", "female"]
            },
            club: {
                type: "string"
            },
            dominantHand: {
                type: "string",
                enum: ["right", "left"]
            },
            playStyle: {
                type: "string",
                enum: ["offensive", "defensive", "all-round"]
            },
            gripType: {
                type: "string",
                enum: ["shakehand", "penhold"]
            }
        }
    }
};