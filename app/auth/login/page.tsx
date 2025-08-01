import Link from "next/link"
import LogInForm from "./form"

const LogInPage = () => {
    return (
        <div className="max-w-[700px] w-[80%] mx-auto border-2 border-gray-500 rounded-2xl p-4 ">
            <h3 className="text-2xl text-center">Welcome Back!</h3>

            <LogInForm />
            <Link href="/auth/signup" className="block text-center text-red-500 font-bold">
                Sign up here
            </Link>
        </div>
    )
}

export default LogInPage