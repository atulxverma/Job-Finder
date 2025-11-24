'use client'
import { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Card } from "./ui/card";
import { LoaderPinwheelIcon, Trash2 } from "lucide-react";
import { Application, Company, Openings, User } from "@prisma/client";
import { UserContext } from "@/app/(protected)/layout";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function ViewJobApplications({ job }: {
    job: Openings & { company: Company }
}) {
    const { user } = useContext(UserContext);
    const [applicants, setApplicants] = useState<(Application & { user: User })[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getApplications() {
            setLoading(true);
            const res = await fetch("/api/applicants/" + job.id);
            const data = await res.json();
            setLoading(false);
            if (data.success) {
                setApplicants(data?.data);
            }
        }
        getApplications();
    }, []);

    async function handleDelete(appl_id: string) {
        try {
            const resp = await fetch("/api/applicants/" + appl_id, {
                method: "DELETE"
            });
            const data = await resp.json();

            if (data.success) {
                toast.success(data.message);
                const updatedAppl = applicants.filter(appl => appl.id != appl_id);
                setApplicants(updatedAppl);
            } else {
                toast.error("Error occurred")
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!")
        }
    }

    if (user?.company?.id != job.company_id) return null;
    return (
        <Dialog>
            <DialogTrigger>view job applicants</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Job Applicants</DialogTitle>
                    <DialogDescription>
                        Below are the applicants for this job:
                    </DialogDescription>
                </DialogHeader>

                {
                    loading && <LoaderPinwheelIcon className="animate-spin" />
                }

                {
                    applicants.length > 0 ? (
                        applicants.map(application => (
                            <Card key={application.id} className="w-full flex justify-between items-center p-3">
                                <p className="ml-3">{application.user.email}</p>
                                <Button
                                    variant="destructive"
                                    className="w-fit"
                                    onClick={() => handleDelete(application.id)}
                                >
                                    <Trash2 />
                                </Button>
                            </Card>
                        ))
                    ) : (
                        <span>No applicants</span>
                    )
                }
            </DialogContent>

        </Dialog>
    )
}