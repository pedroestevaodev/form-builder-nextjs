import { Button } from "../ui/button";
import { MdPreview } from "react-icons/md";

const PreviewDialogBtn = () => {
    return (
        <Button
            type="button"
            variant={"outline"}
            className="gap-2"
        >
            <MdPreview className="size-6" />
            Preview
        </Button>
    );
};

export { PreviewDialogBtn };