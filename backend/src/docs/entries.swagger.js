/**
 * @openapi
 * tags:
 *   name: Entries
 *   description: Tournament registrations
 */

/**
 * @openapi
 * /entries:
 *   post:
 *     summary: Register a player in a tournament
 *     tags: [Entries]
 *     responses:
 *       201:
 *         description: Player registered successfully
 */

/**
 * @openapi
 * /entries/tournament/{id}:
 *   get:
 *     summary: Get tournament entries
 *     tags: [Entries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tournament entries
 */