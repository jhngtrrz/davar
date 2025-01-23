import Link from "next/link";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Navbar() {
    return (
        <nav className="w-full flex justify-between border-b border-b-foreground/10 h-16 px-5">
            <div className="w-full max-w-6xl flex justify-between items-center mx-auto p-3 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link href="/">Davar</Link>
                </div>

                <div className="flex gap-4 items-center">
                    <ThemeSwitcher />
                    {<HeaderAuth />}
                </div>
            </div>
        </nav>
    );
}
