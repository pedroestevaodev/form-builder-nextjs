import { HiSaveAs } from "react-icons/hi";
import { Button } from "../ui/button";
import { useDesigner } from "@/contexts/DesignerContext";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "@/hooks/useToast";
import { useTransition } from "react";
import { BtnFormProps } from "@/types/components";
import { FaSpinner } from "react-icons/fa";

const SaveFormBtn = ({ id }: BtnFormProps) => {
    const { elements } = useDesigner();
    const [loading, startTransition] = useTransition();

    const updateFormContent = async () => {
        try {
            const jsonElements = JSON.stringify(elements);
            await UpdateFormContent(id, jsonElements);

            toast({
                title: "Success",
                description: "Form saved successfully",
            });
        } catch (error) {
            console.log('ERROR TO SAVE FORM', error);
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            });
        }
    };

    return (
        <Button
            type="button"
            variant={"outline"}
            className="gap-2"
            disabled={loading}
            onClick={() => {
                startTransition(updateFormContent);
            }}
        >
            <HiSaveAs className="size-4" />
            Save
            {loading && <FaSpinner className="animate-spin" />}
        </Button>
    );
};

export { SaveFormBtn };