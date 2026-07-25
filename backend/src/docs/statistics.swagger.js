/**
 * @openapi
 * tags:
 *   name: Statistics
 *   description: Player and tournament statistics
 */

/**
 * @openapi
 * /statistics/player/{id}:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get player statistics
 *     description: Returns statistics for a specific player.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Player ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Player statistics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistics'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /statistics/tournament/{id}:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get tournament statistics
 *     description: Returns statistics for a specific tournament.
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
 *         description: Tournament statistics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistics'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */