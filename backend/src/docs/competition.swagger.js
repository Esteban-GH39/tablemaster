/**
 * @openapi
 * tags:
 *   name: Competitions
 *   description: Competition management
 */

/**
 * @openapi
 * /competition/{id}/start:
 *   post:
 *     tags:
 *       - Competitions
 *     summary: Start a competition
 *     description: Starts the competition for a tournament by generating its stages and matches.
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
 *         description: Competition started successfully.
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */