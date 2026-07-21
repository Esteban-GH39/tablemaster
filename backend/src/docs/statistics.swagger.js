/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: Tournament and player statistics
 */

/**
 * @swagger
 * /statistics/player/{id}:
 *   get:
 *     summary: Get player statistics
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Player statistics
 */

/**
 * @swagger
 * /statistics/tournament/{id}:
 *   get:
 *     summary: Get tournament statistics
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tournament statistics
 */