'use client'
import { DeletePost } from "@/actions/delete"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeleteButton = ({postId}:{postId:number}) => {
    const {mutate} =useMutation({
            mutationFn: () => DeletePost(postId),
            
            onSuccess: () => toast.success("Your post was deleted"),
            onMutate: () => toast.loading("Bye bye..."),
            onSettled: () => toast.dismiss()
           
            
        })
    return <button onClick={() => mutate()} className="button-black">Delete post</button>
}

export default DeleteButton