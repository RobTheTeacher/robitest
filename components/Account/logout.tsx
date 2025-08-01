
'use client'
import { LogOut } from "@/actions/logout"
import Link from "next/link"

const LogOutLink = () => {
    return <button onClick={() =>LogOut()} className="button-secondary">LogOut</button>
}

export default LogOutLink