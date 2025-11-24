"use client"
import CompanyReviewsAndJobContainer from "@/components/company-reviews-job-container";
import DeleteCompanyButton from "@/components/deleteCompanyBtn";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Company, User } from "../../../../../generated/prisma";
import { UserContext } from "../../layout";

export default function Page() {
    const params = useParams();
    const id = params.id;

    const [company, setCompany] = useState<Company | null>(null);
    const [owner, setOwner] = useState<User | null>(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getCompany() {

            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/company/` + id);
            const data = await res.json();

            if (!data.success) {
                console.error(data.message);
                return <p className="text-center text-destructive mt-10">No data found!</p>;
            }

            const companyData = data.data;
            setCompany(companyData);
            setOwner(companyData.owner);
        }
        getCompany();
    }, []);

    if (!company || !owner) {
        return <main className="p-4 md:p-8 max-w-5xl mx-auto flex flex-col gap-6">
            <div>Loading...</div>
        </main>
    }

    return (
        <main className="p-4 md:p-8 max-w-5xl mx-auto flex flex-col gap-6">
            <section className="bg-muted rounded-xl p-4 md:p-6 shadow-sm space-y-4">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">{company?.title}</h2>
                    <p className="text-muted-foreground">{company?.description}</p>
                </div>

                <hr className="border-border" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-muted-foreground">
                        Owner: <span className="text-foreground font-medium">{owner?.email}</span>
                    </h3>
                    {
                        user?.id === owner.id &&
                        <DeleteCompanyButton id={company?.id} />
                    }
                </div>
            </section>

            <section className="w-full">
                <CompanyReviewsAndJobContainer
                    owner_id={owner?.id}
                    company_id={company?.id}
                />
            </section>
        </main>
    );
}
