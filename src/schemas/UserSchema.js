const { z } = require('zod')

module.exports = new class UserSchema{
    getAuthUserSchema(){
        const authSchema = z.object({
            username: z.string()
                .min(6, "Username at least 6 characters")
                .max(255, "Username maximum 255 characters"),
            password: z.string()
                .min(6, "Password at least 6 characters")
                .max(255, "Password maximum 255 characters")
        })

        return authSchema
    }

    //Validate login and sign up
    validateAuthUser(authBody){
        return this.getAuthUserSchema().safeParse(authBody)
    }
}