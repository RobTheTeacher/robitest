import { createClient } from "./browser";
import { type QueryData} from '@supabase/supabase-js'

export const getHomePosts = (supabase: ReturnType<typeof createClient>) => {
    return supabase
      .from('posts')
      .select('slug, title, user("username"), created_at')
      .order('created_at', {ascending: false})
}

export const getPost = (slug:string, ) => {
  const supabase = createClient();
   return supabase
    .from('posts')
    .select('id, title, content, user_id, user("username"), created_at')
    .eq('slug', slug)
    .single()
}

export const searchPosts = (searchInput:string) => {
  const supabase = createClient();
   return supabase
    .from('posts')
    .select('*')
    .textSearch('title', searchInput)
}

export const deletePost = (id:number) => {
     const supabase = createClient()
    
        return supabase.from('posts').delete().eq('id', id).throwOnError()

 }
export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>
export type PostType = QueryData<ReturnType<typeof getPost>>
