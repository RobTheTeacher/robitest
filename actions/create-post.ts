'use server'
import z from "zod";
import { createPostSchema } from './schemas'
import { createClient } from "@/utils/supabase/server";
import { slugify } from "@/utils/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const CreateNewPost = async (userdata: z.infer<typeof createPostSchema>) => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    console.log("user: ", user)

    if (!user) throw new Error("Not authorized")

    const parsedData = createPostSchema.parse(userdata)
    const slug = slugify(parsedData.title)

    const { error } = await supabase.from('posts')
        .insert([{ user_id: user.id, slug, ...parsedData }])
        .throwOnError()

    if (error) console.log(error)

    revalidatePath("/")
    redirect("/")
}