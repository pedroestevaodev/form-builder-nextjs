import { useDesigner } from "@/contexts/DesignerContext";
import { Button } from "../ui/button";
import { MdPreview } from "react-icons/md";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FormElements } from "../FormElements";

const PreviewDialogBtn = () => {
    const { elements } = useDesigner();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant={"outline"}
                    className="gap-2"
                >
                    <MdPreview className="size-6" />
                    Preview
                </Button>
            </DialogTrigger>
            <DialogContent
                className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0"
            >
                <DialogHeader className="border-b px-4 py-2">
                    <DialogTitle className="text-lg font-bold text-muted-foreground">
                        Form preview
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        This is how your form will loke like yo your users.
                    </DialogDescription>
                </DialogHeader>
                <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url('/paper.svg')] dark:bg-[url('/paper-dark.svg')] overflow-y-auto">
                    <div className="max-w-[650px] flex flex-col flex-grow gap-4 bg-background size-full rounded-2xl p-8 overflow-y-auto">
                        {elements.map((element) => {
                            const FormComponent = FormElements[element.type].formComponent;
                            return (
                                <FormComponent key={element.id} elementInstance={element} />
                            );
                        })}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { PreviewDialogBtn };