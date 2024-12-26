import { ChildrenProps } from "@/types/nextjs";

const BuilderLayout = ({ children }: Readonly<ChildrenProps>) => {
    return (
        <div className="flex w-full flex-grow">
            {children}
        </div>
    );
};

export default BuilderLayout;