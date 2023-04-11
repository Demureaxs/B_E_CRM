"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = void 0;
const authorizeUser = (req, res, next) => {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.passport) || !req.session.passport.user) {
        return res.redirect('/login');
    }
    next();
};
exports.authorizeUser = authorizeUser;
