import {z} from 'zod'

export const logInSchema = z.object( {
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be 6 characters long")
})


export const createPostSchema = z.object({
    title: z.string().min(3, "Title must have a minimum of three characters"),
    content: z.string().optional()
})