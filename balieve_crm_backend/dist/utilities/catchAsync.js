"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const mongoose_1 = require("mongoose");
const catchAsync = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (err) {
            if (err instanceof mongoose_1.Error.ValidationError) {
                const errors = {};
                for (const [key, value] of Object.entries(err.errors)) {
                    errors[key] = value.message;
                }
                res.status(400).json({ error: errors });
            }
            else {
                console.error(err);
                res.status(500).json({ error: 'Server Error' });
            }
        }
    };
};
exports.catchAsync = catchAsync;
