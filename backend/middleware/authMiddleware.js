import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Invalid authorization header"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (!Number.isInteger(decoded.userId) || decoded.userId <= 0) {
            return res.status(401).json({
                message: "Invalid token payload"
            });
        }

        req.userId = decoded.userId;

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }

    next();
};

export default authMiddleware;