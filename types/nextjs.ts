export interface ChildrenProps {
    children: React.ReactNode;
};

export interface ErrorPageProps {
    error: Error;
};

export interface BuilderPageProps {
    params: {
        id: string;
    };
};