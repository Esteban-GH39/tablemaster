/**
 * @swagger
 * tags:
 *   name: Match Results
 *   description: Register match results
 */

/**
 * @swagger
 * /match-results/{id}:
 *   post:
 *     summary: Register a match result
 *     tags: [Match Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Match result registered successfully
 */