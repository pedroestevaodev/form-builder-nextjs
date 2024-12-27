import { BtnFormProps } from "@/types/components";

const SubmissionsTable = ({ id }: BtnFormProps) => {
    return (
        <>
            <h1 className="text-2xl font-bold my-4">Submissions ({id})</h1>
        </>
    );
};

export { SubmissionsTable };