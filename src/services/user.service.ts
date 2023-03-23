import prisma  from '../db';
import { PrismaClient } from '@prisma/client';
import User from './user.interface'
class UserService {
    private prismaConnection: PrismaClient
    constructor (){
        this.prismaConnection= prisma;
    }

    async getAllUsers():Promise<User[]>{
        try {
            return await this.prismaConnection.user.findMany({})
        } catch (error) {
            
        }
    }
}

export default UserService