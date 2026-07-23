import swaggerJsdoc from "swagger-jsdoc";
import { playerSchema } from "../docs/schemas/player.schema.js";
import { tournamentSchema } from "../docs/schemas/tournament.schema.js";
import { teamSchema } from "../docs/schemas/team.schema.js";
import { competitionSchema } from "../docs/schemas/competition.schema.js";
import { stageSchema } from "../docs/schemas/stage.schema.js";
import { groupSchema } from "../docs/schemas/group.schema.js";
import { matchSchema } from "../docs/schemas/match.schema.js";
import { statisticsSchema } from "../docs/schemas/statistics.schema.js";
import { rankingSchema } from "../docs/schemas/ranking.schema.js";

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
                ...playerSchema,
                ...tournamentSchema,
                ...teamSchema,
                ...competitionSchema,
                ...stageSchema,
                ...groupSchema,
                ...matchSchema,
                ...statisticsSchema,
                ...rankingSchema
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