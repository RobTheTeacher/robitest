'use client'
import { EditPost } from "@/actions/edit-post"
import { createPostSchema } from "@/actions/schemas"
import { type Tables } from "@/utils/supabase/database.types"
import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const EditPostForm = ({ defaultValues, postId }: 
    { defaultValues: Pick<Tables<'posts'>, 'title' | 'content'>,postId:number }
) => {
    const { register, handleSubmit, formState : {errors} } = useForm({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            title: defaultValues.title,
            content: defaultValues.content || undefined
        }
    })

    const {mutate, isPending} = useMutation({
        mutationFn: EditPost,
        onSuccess: () => toast.success("Post Updated!"),
    })

    return (
        <>
            <form onSubmit={handleSubmit(values => mutate({data: values, postId}))} className="flex gap-4 flex-wrap flex-start">
                <fieldset className="w-full"></fieldset>
                <fieldset className="w-full">
                    <label>Title</label>
                    <input {...register('title')} className="w-full border rounded-2xl p-4" />
                    <ErrorMessage errors={errors} name="title" />
                </fieldset>
                <fieldset className="w-full">
                    <label>Content</label>
                    <input {...register("content")} className="w-full border rounded-2xl p-4" />
                </fieldset>
                <fieldset className="w-full">
                    <button className="button-secondary">{isPending? "Updating..." : "Update post"}</button>
                </fieldset>
            </form>

        </>
    )
}
export default EditPostForm
