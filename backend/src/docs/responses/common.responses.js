export const commonResponses = {
    ValidationError: {
        description: "Validation error.",
        content: {
            "application/json": {
                example: {
                    message: "Validation failed"
                }
            }
        }
    },

    NotFound: {
        description: "Resource not found.",
        content: {
            "application/json": {
                example: {
                    message: "Resource not found"
                }
            }
        }
    },

    InternalServerError: {
        description: "Internal server error.",
        content: {
            "application/json": {
                example: {
                    message: "Internal server error"
                }
            }
        }
    }
};