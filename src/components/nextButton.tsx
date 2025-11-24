'use client'
import { ArrowRightCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Job } from "../../generated/prisma";

export default function(){
    const router= useRouter();
    const params = useSearchParams();
    const q = params.get('q');
    const jt = params.get('jt') || "remote";
    const et = params.get('et') || "fulltime";
    const minSal = params.get('ms')
    const ms =  minSal? Number.parseInt(minSal) : 100000;
    const pageNo = params.get("page")
    const page = pageNo? Number.parseInt(pageNo):1;

    function handleNext(){
        const url = `/search?q=${q}&jt=${jt}&et=${et}&ms=${ms}&page=${page}`;
        router.push(url);
    }
    return(
        <button  onClick={handleNext}><ArrowRightCircleIcon/>Next</button>
    )
}