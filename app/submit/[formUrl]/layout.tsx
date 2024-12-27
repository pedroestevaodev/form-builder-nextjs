import { Logo } from "@/components/Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ChildrenProps } from "@/types/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SubmitLayout = async ({ children }: Readonly<ChildrenProps>) => {
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in');
    }

    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen">
            <nav className="flex items-center justify-between border-b border-border h-[60px] px-4">
                <Logo />
                <ThemeSwitcher />
            </nav>
            <main className="flex w-full flex-grow">
                {children}
            </main>
        </div>
    );
};

export default SubmitLayout;