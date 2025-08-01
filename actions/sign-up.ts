'use server'
import { createClient } from "@/utils/supabase/server"

export const SignUp = async(formdata:FormData) => {
    const userData = {
        email: formdata.get('email') as string,
        username: formdata.get('username') as string,
        password: formdata.get('password')as string
    }
    const supabase = await createClient()

    const {data: {user}, error} = await supabase.auth.signUp(userData)

    if (user && user.email) {
        const {data, error} = await supabase.from('user').insert([{id: user.id,email: user.email, username: userData.username}])
        console.log(data, error)
    }

}