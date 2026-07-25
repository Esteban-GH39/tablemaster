/**
 * @openapi
 * tags:
 *   name: Ranking
 *   description: Player rankings
 */

/**
 * @openapi
 * /ranking:
 *   get:
 *     tags:
 *       - Ranking
 *     summary: Get global ranking
 *     description: Returns the global ranking of all registered players.
 *     responses:
 *       200:
 *         description: Global ranking retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ranking'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /ranking/tournament/{id}:
 *   get:
 *     tags:
 *       - Ranking
 *     summary: Get tournament ranking
 *     description: Returns the ranking for a specific tournament.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Tournament ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tournament ranking retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ranking'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */