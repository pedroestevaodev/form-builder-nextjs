import { Logo } from "@/components/Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ChildrenProps } from "@/types/nextjs";
import { UserButton } from "@clerk/nextjs";

const DashboardLayout = ({ children }: ChildrenProps) => {
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <nav className="flex items-center justify-between border-b border-border h-[60px] px-4">
                <Logo />
                <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    <UserButton afterSwitchSessionUrl="/sign-in" />
                </div>
            </nav>
            <main className="flex w-full flex-grow">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;