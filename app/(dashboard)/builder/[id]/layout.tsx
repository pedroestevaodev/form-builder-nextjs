import { ChildrenProps } from "@/types/nextjs";

const BuilderLayout = ({ children }: Readonly<ChildrenProps>) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default BuilderLayout;