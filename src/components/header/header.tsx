import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "../searchInput";
import { ModeToggle } from "./modeToggleBtn";
import { HeaderDropdown } from "./headerDropdown";

export default function Header() {
    return (
        <header className="w-full h-15 flex justify-between items-center px-5 gap-2">
            <Link href={"/"} className="text-2xl font-medium flex gap-2">
                <Image src={"/job-search.png"} height={25} width={35} alt="logo" priority />
                <p className="md:block hidden">Job Finder</p>
            </Link>
            <section className="flex gap-3">
                <SearchInput />
                <ModeToggle />
                <HeaderDropdown />
            </section>
        </header>
    )
}