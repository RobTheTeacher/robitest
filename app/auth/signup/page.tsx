import SignUpForm from "./form"

const SignUpPage = () => {
    return (
        <div className="max-w-[700px] w-[80%] mx-auto border-2 border-gray-500 rounded-2xl p-4 ">
            <h3 className="text-4xl mb-4 text-center">Don't have an account? Join here</h3>
            <SignUpForm />
        </div>
    )
}

export default SignUpPage