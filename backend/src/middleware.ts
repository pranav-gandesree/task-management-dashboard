import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import User from "./models/User";


// Custom request interface
interface CustomRequest extends Request {
    user?: any; // Adjust type as needed
}

const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send("No authorization header found");
        }

        const accessToken = authorization.split(" ")[1];

        if (!accessToken) {
            return res.status(401).send("Token not found");
        }

        const payload = jwt.verify(accessToken, "jwtsecret");

        const { id } = payload as any;

        if (!id) {
            return res.status(401).send("Invalid token provided");
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send("User not registered");
        }

        req.user = user; // Attach user to the request object
        next();
    } catch (error: any) {
        console.error("Token verification error:", error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).send("Token expired");
        }
        res.status(500).send("Server error");
    }
};

export default verifyToken;
