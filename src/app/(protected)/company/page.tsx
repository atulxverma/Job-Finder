import db from "@/services/prisma"

export default async function CompaniesPage(){
    const companies = await db.company.findMany({
        include: {
            owner: true
        }
    });
    return (
        <main className="h-full w-full p-5">
            <h2>
                All Companies
            </h2>
            <section>

            {
                companies.map(comp=>{
                    return <div key={comp.id} className="border p-2 rounded-md">
                        <p>{comp.title}</p>
                        <p>{comp.description}</p>
                        <p>CEO : <span>{comp.owner.email}</span></p>
                    </div>
                })
            }
            </section>
        </main>
    )
}