"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const weddingRoutes_1 = __importDefault(require("./routes/weddingRoutes"));
const agentRoutes_1 = __importDefault(require("./routes/agentRoutes"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const authorizeUser_1 = require("./utilities/authorizeUser");
const userModel_1 = __importDefault(require("./models/userModel"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
require("./models/userModel");
require("./services/passport");
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
mongoose_1.default.connect(process.env.MONGO_URI, () => {
    console.log('Mongoose Connected');
});
app.use((0, express_session_1.default)({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
(0, authRoutes_1.default)(app);
app.use((0, morgan_1.default)('short'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.get('/', authorizeUser_1.authorizeUser, (req, res) => {
    console.log('Authorize user Middleware has been executed successfully');
    res.sendFile(path_1.default.join(__dirname, '../../balieve_crm_vite/dist/index.html'));
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../../balieve_crm_vite/dist')));
app.use('/api/v1/weddings', /* authorizeUser, */ weddingRoutes_1.default);
app.use('/api/v1/agents', agentRoutes_1.default);
// need to export these functions to their relevant routes
app.get('/api/v1/users', async (req, res) => {
    try {
        const users = await userModel_1.default.find();
        res.json(users);
    }
    catch (err) {
        console.log(err);
    }
});
app.post('/api/v1/users', async (req, res) => {
    try {
        const { displayName, email, googleId, role } = req.body;
        const existingUser = await userModel_1.default.find({ email });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const user = new userModel_1.default({ displayName, email, googleId, role });
        await user.save();
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Creating User' });
    }
});
app.get('/login', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../balieve_crm_vite/dist/login.html'));
});
const PORT = process.env.port || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
