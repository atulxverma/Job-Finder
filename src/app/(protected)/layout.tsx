'use client'

import Header from "@/components/header/header";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Company, User } from "@prisma/client";

export const UserContext = createContext<{
    user: (User & { company: Company | null }) | null,
    setUser: (value: User & { company: Company | null } | null) => void
}>({
    user: null,
    setUser: () => {}
});

export default function Layout({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User & { company: Company | null } | null>(null);

    useEffect(() => {
        async function getUser() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/current-user`, {
                    credentials: "include"
                });

                const data = await res.json();

                if (data.success) {
                    setUser(data.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching current user:", error);
                setUser(null);
            }
        }
        getUser();
    }, []);

    return (
        <div>
            <UserContext.Provider value={{ user, setUser }}>
                <Header />
                {children}
            </UserContext.Provider>
        </div>
    );
}
