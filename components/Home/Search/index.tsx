'use client'
import { HomePostType, searchPosts } from "@/utils/supabase/queries"
import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"
import Link from "next/link"
import { SetStateAction, useState } from "react"

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')

    const { data } = useQuery({
        queryKey: ["search", searchTerm],
        queryFn: async () => {
            const { data, error } = await searchPosts(searchTerm);
            if (error) throw new Error
            return data
        }
    })
    return (
        <>
            <div className="flex">
                <Search />
                <input type="text" onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-500" placeholder="search"></input>
            </div>

            {data && data.map(item => <Link className="post" href={`/${item.slug}`} key={item.slug}>{item.title}</Link>)}

        </>
    )
}

export default SearchInput