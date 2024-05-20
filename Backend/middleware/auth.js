import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expect 'Bearer TOKEN'

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided. Login again.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error.decoded)
        return res.status(403).json({ success: false, message: 'Failed to authenticate token.' , decoded:error.decoded });
    }
}

export default authMiddleware;
