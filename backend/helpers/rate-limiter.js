const rateLimit = require("express-rate-limit");

module.exports = {
    likeLimiter: rateLimit({
        windowMs: 5 * 60 * 1000, // 10 minutes block
        max: 10, // start blocking after 5 requests
        message: {
            errors: [{
                title: "Too many requests",
                message: "Too many likes from this IP, please try again later."
            }]
        }
    })
}