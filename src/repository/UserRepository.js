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
        const role = await prisma.roles.findUnique({
            where: {
                name: user.role
            }
        });

        const createdUser = await prisma.users.create({
            data: {
                username: user.username,
                password: user.password,
                name: user.name,
                address: user.address,
                status: user.status
            }
        });

        // Associate the user with the role in the user_roles table
        await prisma.user_roles.create({
            data: {
                user_id: createdUser.id,
                role_id: role.id
            }
        });

        return createdUser;
    }

    async getUsers(page, pageSize) {
        if (!page || !pageSize) {
            page = 1;
            pageSize = 10;
        }
        const skip = (Number(page) - 1) * Number(pageSize);
        const totalUsers = await prisma.users.count()
        const totalPages = Math.ceil(totalUsers / Number(pageSize))

        const users = await prisma.users.findMany({
            skip: Math.abs(skip),
            take: Math.abs(pageSize),
            select: {
                id: true,
                username: true,
                last_login: true,
                status: true,
                roles: {
                    select: {
                        role: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })

        return { users, totalPages, page: Number(page) }
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

    async deleteUser(username) {
        const user = await prisma.users.findUnique({
            where: {
                username: username
            }
        });

        if (!user) {
            throw new Error(`User with username ${username} not found`);
        }

        // Delete related records in user_roles table
        await prisma.user_roles.deleteMany({
            where: {
                user_id: user.id
            }
        });

        // Delete the user
        const response = await prisma.users.delete({
            where: {
                id: user.id
            }
        });

        return response;
    }

    async changePassword(username, newPassword) {
        const response = await prisma.users.update({
            where: {
                username: username
            },
            data: {
                password: newPassword
            }
        })

        return response
    }

    async addSlackbot(username, channelId, accessToken) {
        const user = await prisma.users.findUnique({
            where: {
                username: username
            }
        });

        if (!user) {
            throw new Error(`User with username ${username} not found`);
        }

        // Use a transaction to create the slack token and update the user's slackTokenId
        const response = await prisma.slackTokens.create({
            data: {
                accessToken: accessToken,
                channelId: channelId,
                user_id: user.id,
            }
        });

        return response;
    }

    async setUserRole(username, newRole) {
        // Fetch the user by username
        const user = await prisma.users.findUnique({
            where: {
                username: username
            }
        });

        if (!user) {
            throw new Error(`User with username ${username} not found`);
        }

        // Fetch the new role ID based on the role name
        const role = await prisma.roles.findUnique({
            where: {
                name: newRole
            }
        });

        if (!role) {
            throw new Error(`Role with name ${newRole} not found`);
        }

        // Update the user's role in the user_roles table
        await prisma.user_roles.updateMany({
            where: {
                user_id: user.id
            },
            data: {
                role_id: role.id
            }
        });

        return { message: `User role updated to ${newRole}` };
    }
}