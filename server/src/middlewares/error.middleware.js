import ApiError from "#utils/api.error";

export default (err, req, res, next) => {
    // if the server has already started sending response to client sending another response would cause a crash, by calling next(err) delegate the
    // error to default express error handler which logs the error and closes the connection.
    if (res.headerSent) return next(err);

    // if error is instance of ApiError class, use its properties
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.error,
        });
    }

    // if the error is an unexpected error log it for debugging.
    console.log(err);

    // send generic 500 status code for every other error
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};
