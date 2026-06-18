/**
 * @openapi
 * /tournaments:
 *   get:
 *     tags:
 *       - Tournaments
 *     summary: Get all tournaments
 *     description: Returns a list of all registered tournaments.
 *     responses:
 *       200:
 *         description: List of tournaments retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tournament'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /tournaments/{id}:
 *   get:
 *     tags:
 *       - Tournaments
 *     summary: Get tournament by ID
 *     description: Returns a single tournament.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Tournament ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tournament found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tournament'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /tournaments:
 *   post:
 *     tags:
 *       - Tournaments
 *     summary: Create a new tournament
 *     description: Creates a new tournament.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TournamentCreate'
 *           example:
 *             name: "Liga Bogotá 2026"
 *             description: "Primer torneo nacional del año"
 *             location: "Bogotá"
 *             startDate: "2026-08-10"
 *             endDate: "2026-08-12"
 *             status: "registration"
 *             maxPlayers: 64
 *     responses:
 *       201:
 *         description: Tournament created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tournament'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /tournaments/{id}:
 *   put:
 *     tags:
 *       - Tournaments
 *     summary: Update a tournament
 *     description: Replaces all tournament information.
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
 *             $ref: '#/components/schemas/TournamentCreate'
 *     responses:
 *       200:
 *         description: Tournament updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tournament'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /tournaments/{id}:
 *   patch:
 *     tags:
 *       - Tournaments
 *     summary: Partially update a tournament
 *     description: Updates one or more tournament fields.
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
 *             $ref: '#/components/schemas/TournamentUpdate'
 *     responses:
 *       200:
 *         description: Tournament updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tournament'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @openapi
 * /tournaments/{id}:
 *   delete:
 *     tags:
 *       - Tournaments
 *     summary: Delete a tournament
 *     description: Deletes a tournament by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tournament deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */