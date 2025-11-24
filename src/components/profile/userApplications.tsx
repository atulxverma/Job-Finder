'use client'
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import JobCard from "../jobCard";
import { Application, Openings } from "../../../generated/prisma";

type ApplicationWithUser = Application & { job: Openings };
export default function UserApplications({ user_id }: {
    user_id: string;
}) {
    const [applications, setApplications] = useState<ApplicationWithUser[]>([]);
    async function getUserApplications() {
        const resp = await fetch("/api/applications/" + user_id);
        const data = await resp.json();
        if(data.success){
            setApplications(data.data.applications);
        }
    }
    useEffect(() => {
        getUserApplications();
    }, []);
    if (!applications.length) {
        return <section className="h-full md:w-3/5 p-5">
            <p>No applications</p>
        </section>
    }
    return (
        <section className="h-full md:w-3/5">
            <Card>
                <CardHeader>
                    Your Applications
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-5">
                    {
                        applications.map(appl => {
                            return (
                                <JobCard key={appl.id} job={appl.job} />
                            )
                        })
                    }
                </CardContent>
            </Card>
        </section>
    )
}