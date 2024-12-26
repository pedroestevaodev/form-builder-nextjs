import { ChildrenProps } from "@/types/nextjs";
import ThemeProvider from "./ThemeProvider";
import { Toaster } from "../ui/toaster";
import DesignerProvider from "./DesignerProvider";
import NextToploader from "nextjs-toploader";

const Providers = ({ children }: ChildrenProps) => {
    return (
        <>
            <NextToploader />
            <DesignerProvider>
                <ThemeProvider
                    attribute={'class'}
                    defaultTheme={'system'}
                    enableSystem={true}
                    disableTransitionOnChange={true}
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            </DesignerProvider>
        </>
    );
};

export default Providers;