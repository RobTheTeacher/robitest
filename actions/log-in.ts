'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { logInSchema } from "./schemas"
import z from "zod"


export const LogIn = async (userdata:z.infer<typeof logInSchema>) =>{
    const parsedData = logInSchema.parse(userdata)

    const supabase = await createClient()

    const { data, error} = await supabase.auth.signInWithPassword(parsedData)

    if(error) throw error
    
    redirect("/")
  
}