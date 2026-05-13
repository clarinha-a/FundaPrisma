import { Router } from 'express';
import { prisma } from '../libs/prisma'
import { createUser, createUsers, getAllUsers } from '../services/user';
import { get }  from 'http';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
     const user = await createUser({
        name: 'Gabriel Aaron',
        email: 'aaron@exemple.com',
        posts: {
            create: {
                title: 'Post 1 - Gabriel Aaron',
                content: 'Content of post 1 - Wild Bill'
            }
        }
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

mainRouter.get('/users', async (req, res) => {
    const users = await getAllUsers()
    if (users) {
        res.json({ users })
    } else {
        res.status(500).json({ error: 'Error fetching users' })
    }
})
