import { Prisma } from "@prisma/client"
import { prisma } from "../libs/prisma"

export const createUser = async (data: Prisma.userCreateInput) => {
    try {
       /* const user = await prisma.user.create({
            data
        })

        return user
        */
       return await prisma.user.create({ data })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') { 
                console.error('Error: Email already exists')
                return false
            }
        }
    }
}

export const createUsers = async (users: Prisma.userCreateInput[]) => {
    try {
        return await prisma.user.createMany({
            data: users,
            skipDuplicates: true
        })
    } catch (error) {
        console.log('Error creating users:', error)
        return false
    }
}

export const getAllUsers = async () => {
    try {
        return await prisma.user.findMany({})
    } catch (error) {
        console.log('Error fetching users:', error)
        return false
    }
}