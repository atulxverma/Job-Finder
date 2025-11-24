import { LoaderPinwheelIcon } from "lucide-react";

export default function Loading(){
    return(
        <main className="h-[calc(100vh-60px)] w-full flex justify-center items-center">
            <LoaderPinwheelIcon className="h-15 animate-spin"/>
        </main>
    )
}