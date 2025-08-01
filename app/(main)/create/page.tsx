'use client'
import { useForm } from "react-hook-form"
import { createPostSchema } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { CreateNewPost } from "@/actions/create-post"
import { ErrorMessage } from "@hookform/error-message"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const CreatePost = () => {
    const {register, handleSubmit} = useForm({
        resolver: zodResolver(createPostSchema)
    })

    const {mutate, error} = useMutation({
        mutationFn: CreateNewPost,
        onMutate: () => toast.loading("Creating post"),
        onSettled: () => toast.dismiss(),
        
        onSuccess: () => toast.success("Post Created"),
        onError: (error) => toast.error(error.message)
    })

    return (
        <div className="max-w-[600px] m-auto">
            <h2 className="text-center m-4 font-bold text-2xl">Create a Post</h2>
            <form onSubmit={handleSubmit(values => mutate(values))} className="flex gap-4 flex-wrap flex-start">
                <fieldset className="w-full">
                    <label>Title</label>
                    <input {...register("title")} className="w-full border rounded-2xl p-4" />
                </fieldset>
                <fieldset  className="w-full">
                    <label>Content</label>
                    <textarea {...register("content")} className="w-full border rounded-2xl p-4"  />
                
                </fieldset>
                <fieldset  className="w-full">
                    <button type="submit" className="button-secondary">Create post</button>
                </fieldset>
            </form>
            {error && <p>{error.message}</p>}
        </div>
    )
}

export default CreatePost