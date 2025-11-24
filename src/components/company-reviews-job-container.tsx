'use client'
import { UserContext } from "@/app/(protected)/layout";
import { Heart, LucideLoaderPinwheel, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Review, User } from "@prisma/client";
import AddReviewForm from "./addReviewForm";
import JobCard, { OpeningWithCompany } from "./jobCard";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function CompanyReviewsAndJobContainer({ owner_id, company_id }:
    { owner_id: string, company_id: string }
) {
    const [listedJobs, setListedJobs] = useState<OpeningWithCompany[]>([]);
    const [reviews, setReviews] = useState<(Review & { user: User })[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    useEffect(() => {
        async function getListedJobs() {
            try {
                setLoading(true);
                const jobsRes = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/company/openings/` + company_id);
                const data = await jobsRes.json();
                setListedJobs(data.data);
            } catch (err) {
                console.error("Error Occured!");
            } finally {
                setLoading(false);
            }
        }
        async function getReviews() {
            try {
                setLoading(true);
                const reviewsRes = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/company/review/` + company_id);
                const data = await reviewsRes.json();
                setReviews(data.data);
            } catch (err) {
                console.error("Error Occured!");
            } finally {
                setLoading(false);
            }
        }
        getReviews();
        getListedJobs();
    }, []);

    const handleDeleteReview = async (reviewId: string) => {
        try {
            const res = await fetch(`/api/company/review/${company_id}`, {
                method: 'DELETE',
                body: JSON.stringify({ reviewId: reviewId }),
            });

            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    };
    return (
        <Tabs defaultValue="account" className="w-full">
            <TabsList>
                <TabsTrigger value="account">Listed Jobs</TabsTrigger>
                <TabsTrigger value="password">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="w-full grid sm:grid-cols-2 gap-5">
                {
                    listedJobs.map(job => {
                        return <JobCard key={job.id} job={job} />
                    })
                }
            </TabsContent>
            {loading && <p className="h-full w-full flex justify-center items-center"><LucideLoaderPinwheel className="animate-spin mt-10" /></p>}
            <TabsContent value="password" className="w-full flex flex-col gap-5">
                {
                    user && user.company?.id!=company_id &&
                    <AddReviewForm user_id={user.id} company_id={company_id} />
                }
                {reviews.length > 0 ? <h2>All Reviews</h2> : <h2>No reviews available!</h2>}
                <section className="flex flex-col gap-3">
                    {
                        reviews.map(rev => {
                            return (
                                <Card key={rev.id}>
                                    <CardHeader>
                                        <CardTitle >
                                            <Badge>{rev.user.email}</Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-lg">
                                        {rev.content}
                                    </CardContent>
                                    <CardFooter className="flex gap-2">
                                        {
                                            rev.user_id === user?.id &&
                                            <Trash2 onClick={() => handleDeleteReview(rev.id)} />
                                        }
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </section>
            </TabsContent>
        </Tabs>
    )
}