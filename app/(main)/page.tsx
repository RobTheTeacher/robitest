import { createClient } from "@/utils/supabase/server";
import { getHomePosts, HomePostType } from "@/utils/supabase/queries";
import HomePosts from "../../components/Home/Posts";
import Link from "next/link";

export const revalidate = 60*10
export default async function Home () {
  const supabase = await createClient()

  const {data} = await getHomePosts(supabase);

  return (
    <div>
      <div>
            {data && data.map(item => <Link className="post font-bold" href={`/${item.slug}`} key={item.slug}>{item.title}</Link>)}
        </div>
     
    </div>
  );
}
