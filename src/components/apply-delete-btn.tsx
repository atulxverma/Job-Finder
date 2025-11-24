'use client'
import { useState } from "react";
import { toast } from "sonner";
import { Openings } from "../../generated/prisma";
import JobApplyButton from "./jobApplyBtn";
import { Button } from "./ui/button";

export default function ApplyDeleteButton({ hasApplied, job }: {
    hasApplied: boolean,
    job: Openings
}
) {
    const [userHasApplied, setUserHasApplied] = useState(hasApplied);
    async function handleDelete(){
        try{
            const res = await fetch("/api/job/apply/"+job.id,{
                method: "DELETE"
            });
            const data = await res.json();
            if(data.success){
                setUserHasApplied(false);
            }else{
                toast.error("Failed to delete the application");
            }
        }catch(error){
            console.error(error);
            toast.error(`error occured ${error}`)
        }
    }
    return (
        <>
            {
                !userHasApplied ?
                    <JobApplyButton job={job} setUserHasApplied = {setUserHasApplied}/>
                    :
                    <Button variant="destructive" onClick={handleDelete}>Remove Application</Button>

            }
        </>
    )
}