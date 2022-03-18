import { Request, Response } from "express";
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';

export async function register(req: Request, res: Response): Promise<Response>{

    const { username, email, password } = req.body;

    const user:IUser = new User({
        username,
        email,
        password
    });

    await user.encryptPassword();

    const savedUser:IUser = await user.save()

    const token: string = jwt.sign({_id: savedUser._id}, process.env.JWT_SECRET || 'tockerMock');

    return res.header('auth-token',token).json(savedUser);
}

export async function login(req: Request, res: Response):Promise<Response>{
    const {email, password } = req.body;

    const user: IUser | null = await User.findOne({email});

    if(!user) return res.status(404).json('Wrong credentials');

    if(!(await user.validatePassword(password))) return res.status(404).json('Wrong credentials - pass');

    const token: string = jwt.sign({_id: user._id}, process.env.JWT_SECRET || 'tockerMock');
    
    return res.header('auth-token', token).json(user);
}

export async function profile(req: Request, res: Response):Promise<Response>{
    const user: IUser | null = await User.findById(req.userId,{password: 0});

    if(!user) return res.status(404).json('User not found');
    return res.json(user);
}
