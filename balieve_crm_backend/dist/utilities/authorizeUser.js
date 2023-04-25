"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = void 0;
const authorizeUser = (req, res, next) => {
    // also commenting out!
    // if (!req.session?.passport || !req.session.passport.user) {
    //   return res.redirect('/login');
    // }
    next();
};
exports.authorizeUser = authorizeUser;
