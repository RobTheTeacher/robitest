import { SignUp } from "@/actions/sign-up"
import Link from "next/link"

const SignUpForm = () => {
    return (
        <form action={SignUp} className="flex gap-4 flex-wrap flex-start">
            <fieldset className="w-full flex justify-center">
                <label className="basis-20" htmlFor="username">Username</label>
                <input className="border p-2 ml-2" name="username" placeholder="Whats your name?" required />
            </fieldset>
            <fieldset className="w-full flex justify-center">
                <label className="basis-20" htmlFor="email">Email</label>
                <input className="border p-2 ml-2" type="email" name="email" />
            </fieldset>
           <fieldset className="w-full flex justify-center">
                <label className="basis-20" htmlFor="password">Password</label>
                <input className="border p-2 ml-2" type="password" name="password"></input>
            </fieldset>
            <fieldset className="w-full flex justify-center">
                <button className="button-secondary">Create account!</button>
            </fieldset>
            <p className="text-center w-full">Want to log in? <Link className="text-2xl font-bold" href="/auth/login">Go Here!</Link></p>
        </form>
    )
}

export default SignUpForm