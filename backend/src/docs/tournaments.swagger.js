/**
 * @openapi
 * /tournaments:
 *   get:
 *     tags:
 *       - Tournaments
 *     summary: Get all Tournaments
 *     description: Returns a list of all registered Tournaments.
 *     responses:
 *       200:
 *         description: List of Tournaments retrieved successfully.
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
 *     summary: Get Tournament by ID
 *     description: Returns a single Tournament.
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
 *     summary: Create a new Tournament
 *     description: Creates a new Tournament.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TournamentCreate'
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
 *     summary: Update a Tournament
 *     description: Replaces all Tournament information.
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
 *     summary: Partially update a Tournament
 *     description: Updates one or more Tournament fields.
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
 *     summary: Delete a Tournament
 *     description: Deletes a Tournament by ID.
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