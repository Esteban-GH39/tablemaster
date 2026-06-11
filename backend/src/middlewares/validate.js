export const validate = (schema) => {
    return (req, res, next) => {
        const validation = schema.safeParse(req.body);
        if (!validation.success) {
            return res.satus(400).json({
                message: "Validation failed",
                errors: validation.error.issues
            });
        }
        req.body = validation.data;
        next();
    };
};