import { GetFormContentByUrl } from "@/actions/form";
import { FormSubmitComponent } from "@/components/FormSubmitComponent";
import { FormElementInstance } from "@/types/components";
import { SubmitPageProps } from "@/types/nextjs";

const SubmitPage = async ({ params }: SubmitPageProps) => {
    const { formUrl } = await params;

    const form = await GetFormContentByUrl(formUrl);

    if (!form) throw new Error("Form not found");

    const formContent = JSON.parse(form.content) as FormElementInstance[];

    return (
        <FormSubmitComponent formUrl={formUrl} content={formContent} />
    );
};

export default SubmitPage;