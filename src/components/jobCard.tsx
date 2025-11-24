import { MapPin } from "lucide-react";
import Link from "next/link";
import { Openings, Company } from "../../generated/prisma";
import { Badge } from "./ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "./ui/card";

export type OpeningWithCompany = Openings & { company?: Company };

export default function JobCard({ job }: { job: OpeningWithCompany }) {
    return (
        <Card className="h-full shadow-md flex flex-col justify-between">
            <CardHeader className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <div className="flex gap-3">
                    <Badge variant="secondary" className="w-fit h-fit">
                        {job.job_type}
                    </Badge>
                    <Badge variant="default" className="w-fit h-fit">
                        {job.employment_type}
                    </Badge>
                    </div>
                </div>

                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin size={16} /> {job.location}
                </p>
            </CardHeader>

            <CardContent>
                <CardDescription className="line-clamp-3 text-sm text-muted-foreground tracking-wide">
                    {job.description}
                </CardDescription>
            </CardContent>

            <CardFooter className="mt-auto pt-4">
                <div className="flex w-full items-center justify-between text-sm font-medium">
                    {
                        job?.company &&
                        <Link
                            href={`/company/${job.company_id}`}
                            className="hover:underline text-primary"
                        >
                            {job.company.title}
                        </Link>
                    }
                    <Link
                        href={`/job/${job.id}`}
                        className="text-sm text-muted-foreground hover:underline ml-auto"
                    >
                        View
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
