import swaggerJsdoc from "swagger-jsdoc";



import { commonResponses } from "../docs/responses/common.responses.js";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API for managing table tennis tournaments, players and matches"
        },

        servers: [
            {
                url: "http://localhost:3000/api"
            }
        ],

        components: {
            schemas: {

            },
            responses: {
                ...commonResponses
            }
        }
    },
    apis: ["./src/docs/*.js"] 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;