'use client'
import { LogIn } from "@/actions/log-in"
import { useForm } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { logInSchema } from "@/actions/schemas"
import { ErrorMessage } from "@hookform/error-message"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const LogInForm = () => {

    const {mutate, error, isPending} = useMutation({
        mutationFn: LogIn,
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(logInSchema),
        
    })
    return (
        <form onSubmit={handleSubmit(values => mutate(values)) } className="flex gap-4 flex-wrap flex-start">
            <fieldset className="w-full flex justify-center">
                <label className="basis-20" htmlFor="email">Email</label>
                <input className="border p-2 ml-2" {...register("email")} />
            </fieldset>
           <fieldset className="w-full flex justify-center">
                <label className="basis-20" htmlFor="password">Password</label>
                <input className="border p-2 ml-2" {...register("password")} type="password"></input>
                <ErrorMessage errors={errors} name="password" />
            </fieldset>
            <fieldset className="w-full flex justify-center">
                <button className="button-secondary">{isPending ? "Logging in" : "Log in!"}</button>
            </fieldset>
            {error && <div>{error.message}</div>}
        </form>
    )
}

export default LogInForm