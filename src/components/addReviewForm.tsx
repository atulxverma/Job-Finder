'use client'

import { FormEvent, useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { toast } from "sonner";

export default function AddReviewForm({ user_id, company_id }:
    { user_id: string, company_id: string }) {
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const newReview = {
            content: review,
            user_id,
            company_id,
        }
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/company/review/${company_id}`, {
            method: "POST",
            body: JSON.stringify(newReview)
        });
        const data = await res.json();
        if (!data.success) {
            toast.error(data.message);
        } else {
            setReview("");
            toast.success("Review added!");
            window.location.reload();
        }
        setLoading(false);
    }
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl bg-muted p-5 rounded-md flex flex-col gap-5">
            <h2>Give Review</h2>
            <Textarea
                placeholder="enter company review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />
            <Button disabled={loading} type="submit" variant="default">Add</Button>
        </form>
    )
}