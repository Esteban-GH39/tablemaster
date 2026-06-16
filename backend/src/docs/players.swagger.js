/**
 * @openapi
 * /players:
 *   get:
 *     tags:
 *       - Players
 *     summary: Get all players
 *     description: Returns a list of all registered players.
 *     responses:
 *       200:
 *         description: List of players retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /players/{id}:
 *   get:
 *     tags:
 *       - Players
 *     summary: Get player by ID
 *     description: Returns a single player.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Player ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /players:
 *   post:
 *     tags:
 *       - Players
 *     summary: Create a new player
 *     description: Creates a new player.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerCreate'
 *           example:
 *             fullName: "Esteban Girón"
 *             age: 23
 *             gender: "male"
 *             club: "Bogotá TTC"
 *             dominantHand: "right"
 *             playStyle: "offensive"
 *             gripType: "shakehand"
 *     responses:
 *       201:
 *         description: Player created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /players/{id}:
 *   put:
 *     tags:
 *       - Players
 *     summary: Update a player
 *     description: Replaces all player information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerCreate'
 *     responses:
 *       200:
 *         description: Player updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /players/{id}:
 *   patch:
 *     tags:
 *       - Players
 *     summary: Partially update a player
 *     description: Updates one or more player fields.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerUpdate'
 *     responses:
 *       200:
 *         description: Player updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /players/{id}:
 *   delete:
 *     tags:
 *       - Players
 *     summary: Delete a player
 *     description: Deletes a player by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */