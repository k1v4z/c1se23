const prisma = require("../../prisma/db");

module.exports = class UserRepository {
    //Get user by username
    async getUsername(username) {
        const user = await prisma.users.findUnique({
            where: {
                username: username
            },
            include: {
                roles: true
            }
        })

        return user
    }

    async getRoles(username) {
        const roles = await prisma.user_roles.findMany({
            where: {
                user_id: username
            }
        })

        return roles
    }

    async addUser(user) {
        const response = await prisma.users.create({
            data: {
                username: user.username,
                password: user.password
            }
        })

        return response
    }

    async getUsers(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const totalUsers = await prisma.users.count()
        const totalPages = Math.ceil(totalUsers / pageSize)

        const users = await prisma.users.findMany({
            skip: skip,
            take: pageSize,
            select: {
                id: true,
                username: true,
                last_login: true,
                status: true,
                last_login: true,
            }
        })
        return {users, totalPages}
    }

    async setLastLoginUser(username) {
        const response = await prisma.users.update({
            where: {
                username: username
            },
            data: {
                last_login: new Date()
            }
        })

        return response
    }

    async setStatusUser(username, status) {
        const response = await prisma.users.update({
            where: {
                username: username
            },
            data: {
                status: status
            }
        })

        return response
    }
}