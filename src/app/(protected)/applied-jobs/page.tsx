import JobCard from "@/components/jobCard";
import { getUserFromCookies } from "@/hooks/helper";
import db from "@/services/prisma";

export default async function AppliedJobsPage(){
    const currUser = await getUserFromCookies();
    const applications = await db.application.findMany({
        where:{
            user_id : currUser?.id
        },
        include:{
            job: {
                include: {
                    company: true,
                }
            }
        }
    });

    if(!applications.length){
        return <div>No applications found :/</div>
    }

    return(
        <main className="h-full w-full p-5 flex flex-col gap-5">
            <h2 className="">Your Applications</h2>
            <section className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {
                    applications.map(application=>{
                        return <JobCard key={application.id} job={application.job}/>
                    })
                }
            </section>
        </main>
    )
}