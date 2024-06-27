import jwt from 'jsonwebtoken';

const JWT_SRT = process.env.JWT_SECERT;

const fetchuser = (req, res, next) => {
    // Get user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SRT);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

export default fetchuser;
