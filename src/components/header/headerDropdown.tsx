'use client'
import { UserContext } from "@/app/(protected)/layout"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { User2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { toast } from "sonner"

export function HeaderDropdown() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    // console.log(user)
    async function handleLogout() {
        const res = await fetch('/api/logout', { method: 'POST' });
        const data = await res.json();
        if (data.success) {
            toast.success(data.message);
            window.location.href = "/";
        } else {
            toast.error("Logout failed");
        }
    }
    async function handleLogin() {
        router.push("/login");
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><User2 /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                {user && <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>}
                <DropdownMenuSeparator />
                {
                    user &&
                    <DropdownMenuItem onClick={() => router.push("/profile/" + user.id)}>
                        Profile
                    </DropdownMenuItem>
                }
                {
                    user && (user?.company ?
                        <DropdownMenuItem onClick={() => router.push("/add-job")}>
                            + Add Job
                        </DropdownMenuItem>
                        :
                        <DropdownMenuItem onClick={() => router.push("/add-company")}>
                            + Add Company
                        </DropdownMenuItem>)

                }
                {
                    user?.company &&
                    <>
                        <DropdownMenuItem onClick={() => router.push("/company/" + user.company.id)}>
                            View Company
                        </DropdownMenuItem>
                    </>
                }
                {
                    !user ?
                        <DropdownMenuItem onClick={handleLogin}>
                            Log in
                        </DropdownMenuItem>
                        :
                        <>
                            <DropdownMenuItem onClick={() => router.push("/applied-jobs")}>
                                View applied jobs
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                                Log out
                            </DropdownMenuItem>
                        </>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
