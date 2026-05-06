import { Router } from 'express';
import { prisma } from '../libs/prisma'
import { createUser } from '../services/user';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
     const user = await createUser({
        name: 'Ana Clara',
        email: 'ana.clara@gmail.com'
    });
    if (user) {
        res.status(201).json({ user });
    } else {
        res.status(400)
    }
     res.json(user) 
})