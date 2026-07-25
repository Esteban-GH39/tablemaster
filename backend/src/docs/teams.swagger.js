/**
 * @openapi
 * tags:
 *   name: Teams
 *   description: Team management
 */

/**
 * @openapi
 * /teams:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Get all teams
 *     description: Returns a list of all registered teams.
 *     responses:
 *       200:
 *         description: List of teams retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /teams/{id}:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Get team by ID
 *     description: Returns a single team.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Team ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Team found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /teams:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Create a new team
 *     description: Creates a new team.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Club Bogotá TT"
 *             type: "club"
 *     responses:
 *       201:
 *         description: Team created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /teams/{id}:
 *   put:
 *     tags:
 *       - Teams
 *     summary: Update a team
 *     description: Replaces all team information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Team ID
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Club Antioquia"
 *             type: "club"
 *     responses:
 *       200:
 *         description: Team updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     summary: Delete a team
 *     description: Deletes a team by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Team ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Team deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Get players in a team
 *     description: Returns all players belonging to a team.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Team ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Players retrieved successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Add a player to a team
 *     description: Adds an existing player to a team.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Team ID
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             playerId: "e44b1fb8-c1b5-4f9e-8914-ce92adf9bf3b"
 *     responses:
 *       201:
 *         description: Player added successfully.
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /teams/{id}/players/{playerId}:
 *   delete:
 *     tags:
 *       - Teams
 *     summary: Remove a player from a team
 *     description: Removes a player from a team.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Team ID
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: playerId
 *         required: true
 *         description: Player ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Player removed successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */