import ApplyDeleteButton from "@/components/apply-delete-btn";
import EditDelete from "@/components/edit-delete-job";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ViewJobApplications from "@/components/viewJobApplications";
import { getUserFromCookies } from "@/hooks/helper";
import db from "@/services/prisma";
import { Briefcase, Clock, LucideBookmark, MapPin } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: {
    params: Promise<{
        id: string,
    }>
}) {
    const ps = await params
    const id = ps.id;
    const user = await getUserFromCookies();
    let userHasApplied = false;
    let job;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/job/${id}`);
        const data = await res.json();
        if (!data.success) {
            return <p className="text-center mt-10">Job not found.</p>;
        }

        if (user) {
            const application = await db.application.findMany({
                where: {
                    job_id: id,
                    user_id: user?.id
                }
            });

            if (application.length > 0) userHasApplied = true;
        }

        job = data.data;
    } catch (error) {
        return <p className="text-center mt-10">Failed to load job data.</p>;
    }

    if (!job) {
        return <p className="text-center mt-10">No data found!</p>
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <Card className="max-w-4xl mx-auto shadow-lg">
                <CardHeader>
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
                            <CardDescription className="mt-1">
                                Posted by <Link href={`/company/${job.company.id}`} className="font-medium text-primary hover:underline">{job.company.title}</Link>
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* <LucideBookmark /> */}
                            <ApplyDeleteButton job={job} hasApplied={userHasApplied} />
                            <ViewJobApplications job={job} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-lg border bg-muted p-4 my-6">
                        <div className="flex items-center gap-3">
                            <MapPin className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Location</p>
                                <p className="font-semibold">{job.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Salary</p>
                                <p className="font-semibold">₹{job.salary.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Briefcase className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Job Type</p>
                                <Badge variant="outline">{job.job_type}</Badge>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Employment</p>
                                <Badge variant="outline">{job.employment_type}</Badge>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">About the Role</h3>
                        <div className="prose prose-stone dark:prose-invert max-w-none">
                            <p>{job.description}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <EditDelete job={job} />
                </CardFooter>
            </Card>
        </main>
    )
}