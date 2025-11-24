
import UserApplications from "@/components/profile/userApplications";
import UserDetials from "@/components/profile/userDetails";
import UserSavedJobs from "@/components/profile/userSavedJobs";

export default async function ProfilePage({ params }: {
    params: Promise<{
        id: string;
    }>
}) {
    const { id } = await params;
    return (
        <main className="h-full w-full gap-5 p-5">
            <UserDetials />
            <div className="h-full w-full md:flex gap-5 py-5">
                <UserApplications user_id={id} />
                <UserSavedJobs />
            </div>
        </main>
    )
}