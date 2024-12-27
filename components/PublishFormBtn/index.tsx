import { MdOutlinePublish } from "react-icons/md";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { BtnFormProps } from "@/types/components";
import { useTransition } from "react";
import { PublishForm } from "@/actions/form";
import { toast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

const PublishFormBtn = ({ id }: BtnFormProps) => {
    const router = useRouter();
    const [loading, startTransition] = useTransition();

    const publishForm = async () => {
        try {
            await PublishForm(id);

            toast({
                title: "Success",
                description: "Your form has been published",
            });

            router.refresh();
        } catch (error) {
            console.log('ERROR TO PUBLISH FORM', error);
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    type="button"
                    variant={"outline"}
                    className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
                >
                    <MdOutlinePublish className="size-4" />
                    Publish
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. After publishing you will not be aple to edit this form.
                        <br /><br />
                        <span className="font-medium">
                            By publishing this form you will make it available to the public and you will be able to collect submissions.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            startTransition(publishForm);
                        }}
                    >
                        Proceed {loading && <FaSpinner className="animate-spin" />}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export { PublishFormBtn };