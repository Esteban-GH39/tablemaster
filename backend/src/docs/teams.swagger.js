/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team management
 */

/**
 * @openapi
 * /teams:
 *   post:
 *     summary: Create a team
 *     tags: [Teams]
 *     responses:
 *       201:
 *         description: Team created successfully
 *   requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/TeamCreate' 
 */

/**
 * @openapi
 * /teams:
 *   get:
 *     summary: Get all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: List of teams
 */

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a team by id
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Team information
 */

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Update a team
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Team updated successfully
 *     requestBody:
        required: true
        content:
            application/json:
            schema:
                $ref: '#/components/schemas/TeamUpdate'
 */

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Delete a team
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Team deleted successfully
 */