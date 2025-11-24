'use client'

import { useContext } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { UserContext } from "@/app/(protected)/layout"

export default function UserDetials(){
    const {user} = useContext(UserContext);
    return(
        <Card>
                <CardHeader>
                    Profile
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-medium">{user?.email}</h2>
                    <p className="text-muted-foreground text-sm font-medium">{user?.role}</p>
                    <h4 className="text-lg">{user?.company?.title}</h4>
                </CardContent>
            </Card>
    )
}