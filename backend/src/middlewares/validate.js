export const validate = (schema) => {
    return (req, res, next) => {
        const validation = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query
        });
        if (!validation.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validation.error.issues
            });
        }
        if (validation.data.body) {
            req.body = validation.data.body;
        }
        if (validation.data.params) {
            req.params = validation.data.params;
        }
        next();
    };
};