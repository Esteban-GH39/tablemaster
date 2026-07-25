/**
 * @openapi
 * tags:
 *   name: Match Results
 *   description: Match result registration
 */

/**
 * @openapi
 * /match-Results/{id}:
 *   post:
 *     tags:
 *       - Match Results
 *     summary: Register a match result
 *     description: Registers the result of a match and automatically determines the winner based on the submitted sets.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Match ID
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             sets:
 *               - playerOneScore: 11
 *                 playerTwoScore: 8
 *               - playerOneScore: 9
 *                 playerTwoScore: 11
 *               - playerOneScore: 11
 *                 playerTwoScore: 7
 *               - playerOneScore: 11
 *                 playerTwoScore: 5
 *     responses:
 *       200:
 *         description: Match result registered successfully.
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */