const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);

    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        status = 400;
        message = Object.values(err.errors)
            .map((error) => error.message)
            .join(', ');
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        status = 400;
        message = 'Duplicate field value entered';
    }

    // Mongoose cast error
    if (err.name === 'CastError') {
        status = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    res.status(status).json({
        success: false,
        error: message,
    });
};

module.exports = errorHandler;
