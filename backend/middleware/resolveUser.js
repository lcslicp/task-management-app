import User from "../models/User.js";

const resolveUser = async (req, res, next) => {
    if (!req.headers.hasOwnProperty('authorization')) {
        return res.status(401).json({
            error: 'Header is required',
        });
    }
    const user = await User.findById(req.headers['authorization']);

    if (user === null) {
        return res.status(401).json({
            error: 'Invalid user ID',
        });
    }

    req.user = user;

    next();
};

export default resolveUser;