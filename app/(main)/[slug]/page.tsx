import { getPost, PostType } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import DeleteButton from "./deleteButton";
import Link from "next/link";

const Post = async ({ params }: { params: Promise <{slug: string }>}) => {
    const { slug } = await params;
    const { data: post, error } = await getPost(slug)
    const date = post ? new Date(post.created_at).toISOString() : '';

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const isAuthor = user?.id === post?.user_id ? true : false;

    console.log(user?.id)

    return (
        <div>
            {post &&
                <div className="post">
                    <h3 className="text-2xl font-bold">{post.title}</h3>
                    {post.content && <div>{post.content}</div>}
                    <p>{post.user.username}</p>
                    {date && <p>Posted at {date}</p>}

                    {isAuthor && 
                        <div>
                            <DeleteButton postId={post.id}/>
                            <Link className="button-secondary" href={`/${slug}/edit`}>Edit post</Link>
                        </div>}
                </div>
            }
        </div>
    )
}

export default Post