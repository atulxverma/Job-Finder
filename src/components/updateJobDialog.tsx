'use client';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Openings } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function UpdateJobDialog({ job }: {
    job: Openings
}) {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState(job.title);
    const [description, setDescription] = useState(job?.description || "");
    const [location, setLocation] = useState(job.location);
    const [salary, setSalary] = useState(job.salary);
    const [jobType, setJobType] = useState(job.job_type);
    const [employmentType, setEmploymentType] = useState(job.employment_type);

    async function handleUpdate() {
        if (!title || !description) {
            toast.error("Title and Description are required.");
            return;
        }

        try {
            const response = await fetch(`/api/job/${job.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title,
                    description,
                    location,
                    salary: Number(salary),
                }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Job updated successfully!");
                setOpen(false);
                router.refresh();
            } else {
                toast.error(result.message || "Failed to update job.");
            }
        } catch (error) {
            toast.error("An error occurred.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Update Job</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Job</DialogTitle>
                    <DialogDescription>
                        Make changes to your job posting here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input id="title" value={title?? ""} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="description" className="text-right pt-2">Description</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">Location</Label>
                        <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="salary" className="text-right">Salary (₹)</Label>
                        <Input id="salary" type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="col-span-3" />
                    </div>
                </div>
                <Select value={employmentType} onValueChange={setEmploymentType}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Employment Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contractor">Contractor</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="on-site">On Site</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                </Select>
                <DialogFooter>
                    <Button onClick={handleUpdate}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}