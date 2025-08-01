'use client'

import { createClient } from "@/utils/supabase/browser"
import { getHomePosts, HomePostType } from "@/utils/supabase/queries"
import { useQuery } from "@tanstack/react-query"

import Link from "next/link"

const HomePosts = ({ posts }: { posts: HomePostType }) => {

    const { data } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const supabase = createClient()
            const { data, error } = await getHomePosts(supabase)
            if (error) throw new Error
            return data
        },
        initialData: posts,
        refetchOnMount: false,
        staleTime: 10000
    })
    return (
        <div>
            {data && data.map(item => <Link className="post font-bold" href={`/${item.slug}`} key={item.slug}>{item.title}</Link>)}
        </div>
    )
}

export default HomePosts