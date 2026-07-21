/**
 * @swagger
 * tags:
 *   name: Competition
 *   description: Tournament competition management
 */

/**
 * @swagger
 * /competition/{tournamentId}:
 *   post:
 *     summary: Create a competition for a tournament
 *     tags: [Competition]
 *     parameters:
 *       - in: path
 *         name: tournamentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Competition created successfully
 *       404:
 *         description: Tournament not found
 */

/**
 * @swagger
 * /competition/{competitionId}/groups:
 *   post:
 *     summary: Generate tournament groups
 *     tags: [Competition]
 *     parameters:
 *       - in: path
 *         name: competitionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Groups generated successfully
 */

/**
 * @swagger
 * /competition/group/{groupId}/standings:
 *   get:
 *     summary: Get group standings
 *     tags: [Competition]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Group standings
 */

/**
 * @swagger
 * /competition/{competitionId}/knockout:
 *   post:
 *     summary: Generate knockout stage
 *     tags: [Competition]
 *     parameters:
 *       - in: path
 *         name: competitionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Knockout generated successfully
 */