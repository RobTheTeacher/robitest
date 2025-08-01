import { createClient } from "@/utils/supabase/server"
import Create from "./create"
import Login from "./login"
import Logout from "./logout"

const Account = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    return (
        <div>
            {user ? 
                <div>
                    <Create />
                    <Logout />
                </div>
            : 
                <div>
                    <Login />
                </div>
            }
        </div>
    )
}

export default Account