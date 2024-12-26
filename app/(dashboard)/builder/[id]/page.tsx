import { GetFormById } from "@/actions/form";
import { FormBuilder } from "@/components/FormBuilder";
import { BuilderPageProps } from "@/types/nextjs";

const BuilderPage = async ({
    params,
}: BuilderPageProps) => {
    const { id } = params;
    const form = await GetFormById(Number(id));

    if (!form) throw new Error('Form not found');

    return (
        <FormBuilder form={form} />
    );
};

export default BuilderPage;