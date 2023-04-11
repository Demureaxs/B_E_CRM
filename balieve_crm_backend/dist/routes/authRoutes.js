"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
function authRoutes(app) {
    app.get('/auth/google', passport_1.default.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account',
    }));
    app.get('/auth/google/callback', passport_1.default.authenticate('google'), (req, res) => {
        res.redirect('/');
    });
    app.get('/api/v1/logout', (req, res) => {
        req.logout(() => {
            var _a;
            (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy(() => {
                res.status(200).json({ message: 'User logged out successfully.' });
            });
        });
    });
    app.get('/api/v1/current_user', (req, res) => {
        res.send(req.user);
    });
}
exports.default = authRoutes;
