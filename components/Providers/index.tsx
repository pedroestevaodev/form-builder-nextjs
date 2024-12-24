import { ChildrenProps } from "@/types/nextjs";
import ThemeProvider from "./ThemeProvider";

const Providers = ({ children }: ChildrenProps) => {
    return (
        <ThemeProvider
            attribute={'class'}
            defaultTheme={'system'}
            enableSystem={true}
            disableTransitionOnChange={true}
        >
            {children}
        </ThemeProvider>
    );
};

export default Providers;