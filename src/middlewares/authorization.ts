import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: string;
    iat: number;
    exp: number
}

export const authToken = (req:Request, res: Response, next: NextFunction) => {
    const token = req.header('authorization');
    if(!token) return res.status(401).json('Access denied - Missing authentication header');
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'tockerMock') as IPayload;
        req.userId = payload._id; 
        next();
    } catch (error: any) {
        // console.error(error);
        res.status(401).json(error.message);
    }
    
    
}