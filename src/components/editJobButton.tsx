'use client';
import { UserContext } from "@/app/(protected)/layout";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function EditJobDialog() {
    const [jobTitle, setJobTitle] = useState("");
        const [jobDescription, setJobDescription] = useState("");
        const [jobLocation, setJobLocation] = useState("");
        const [jobSalary, setJobSalary] = useState("");
        const [jobType, setJobType] = useState("part-time");
        const [employmentType, setEmploymentType] = useState("on-site");
        const [loading, setLoading]=useState(false);
        const {user} = useContext(UserContext);

        async function handleSubmit(){
            
        }
  return (
    <Dialog>
      <form onSubmit={handleSubmit} className="w-3xl bg-muted p-5 rounded-md flex flex-col gap-5">
                <h2>Job Details</h2>
                <Input
                    type="text"
                    placeholder="enter job title..."
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                />
                <Textarea
                    placeholder="enter job description..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="enter job location..."
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="enter job salary..."
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                />
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
                <Button disabled={loading} type="submit" variant="default">Add</Button>
            </form>
    </Dialog>
  )
}
