import { createClient } from "@/utils/supabase/server"
import EditPostForm from "./form"
import { notFound } from "next/navigation"

const EditPostPage = async ({params}:{params:{slug:string}}) => {
    const {slug} = await params
    const supabase = await createClient()

    const {data : {user}} = await supabase.auth.getUser()

    const {data : post, error} = await supabase.from('posts').select('*').eq('slug', slug ).single()

    if (!post || error ) notFound()

        const isAuthor = user && user.id === post.user_id;
    return (
        <div className="max-w-[600px] m-auto">
            <h2 className="text-center m-4 font-bold text-2xl">Edit page</h2>
            <EditPostForm defaultValues={{title:post.title, content: post.content}} postId={post.id}/>
        </div>
    )
}

export default EditPostPage