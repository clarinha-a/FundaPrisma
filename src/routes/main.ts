import { Router } from 'express';
import { prisma } from '../libs/prisma'
import { createUser, createUsers } from '../services/user';

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

mainRouter.post('/users', async (req, res) => {
    const result = await createUsers([
        {name: 'Olive Smith', email:'olive@exemple.com'},
        {name: 'Adam Carlsen', email:'adama@exemple.com'},
        {name: 'Levi Ward', email:'leviward@nasa.gov.com'},
        {name: 'Bee Konigswasser', email:'beekonigswasser@nasa.gov.com'}
    ])
    if (result) {
        res.status(201).json({ ok:true })
    }else {
        res.status(400).json({error: 'Error creating users'})
    }
})