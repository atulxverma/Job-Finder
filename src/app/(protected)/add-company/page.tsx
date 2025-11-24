'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);

        const company = {
            name,
            description
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/company`, {
            method: "POST",
            body: JSON.stringify(company)
        })
        const data = await res.json();
        if (data.success) {
            toast.success("Company added!");
            window.location.href = "/";
        } else {
            toast.error(data.message);
            return;
        }
        setLoading(false);
    }

    return (
        <main className="h-full w-full flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-3xl bg-muted p-5 rounded-md flex flex-col gap-5">
                <h2>Company Details</h2>
                <Input
                    type="text"
                    placeholder="enter company title..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                    placeholder="enter company description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button disabled={loading} type="submit" variant="default">Add</Button>
            </form>
        </main>
    )
}