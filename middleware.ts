import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))

                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
                }
            }
        }
    )

    const { data: { user }, error } = await supabase.auth.getUser()

    const protectedRoutes = [
        /^\/create$/,
        /^\/[^\/]+\/edit$/
    ]

    if (!user && protectedRoutes.some(route => route.test(request.nextUrl.pathname))) {
        const newRoute = request.nextUrl.clone()
        newRoute.pathname = "/auth/login"
        return NextResponse.redirect(newRoute)

    }


    return supabaseResponse;
}