/**
 * @swagger
 * tags:
 *   name: Ranking
 *   description: Player rankings
 */

/**
 * @swagger
 * /ranking/global:
 *   get:
 *     summary: Get global ranking
 *     tags: [Ranking]
 *     responses:
 *       200:
 *         description: Global ranking
 */

/**
 * @swagger
 * /ranking/tournament/{id}:
 *   get:
 *     summary: Get tournament ranking
 *     tags: [Ranking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tournament ranking
 */