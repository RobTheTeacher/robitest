'use server'

import { createClient } from "@/utils/supabase/server"
import { createPostSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { slugify } from "@/utils/slugify"

export const EditPost = async ({
    postId, data
}: {postId:number, data: z.infer<typeof createPostSchema>}) => {

    const supabase = await createClient()
   console.log("DATA", data)
    const parsedData = createPostSchema.parse(data)

    const {data: {user}} = await supabase.auth.getUser();

    if (!user) throw new Error('Not Authenticated')

    const {data: post} = await supabase.from('posts').select('user_id').eq('id', postId).single()

    if (!post) throw new Error("Post not found")
    
    const isAuthor = user.id === post.user_id

    if (!isAuthor) throw new Error ("You can't edit this post")

       const {data: updatedPost} = await supabase.from('posts')
       .update({...parsedData, slug: slugify(parsedData.title)}).eq('id', postId)
       .select('slug').single().throwOnError()

       revalidatePath("/")
       redirect(`/${updatedPost.slug}`)
}