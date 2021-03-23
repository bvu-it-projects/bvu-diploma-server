export function JsonParserErrorHandler(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({
            status: 400,
            'dev-message': err.message,
            message: 'Invalid input data',
        }); // Bad request
    }

    next();
}
