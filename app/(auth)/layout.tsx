import { Logo } from "@/components/Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ChildrenProps } from "@/types/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: Readonly<ChildrenProps>) => {
    const user = await currentUser();

    if (user) {
        redirect('/');
    }

    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <nav className="flex items-center justify-between border-b border-border h-[60px] px-4 py-2">
                <Logo />
                <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                </div>
            </nav>
            <main className="flex w-full flex-grow h-full items-center justify-center">
                {children}
            </main>
        </div>
    );
};

export default AuthLayout;