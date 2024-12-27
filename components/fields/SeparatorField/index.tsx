'use client';

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ElementsType, FormElement } from "@/types/components";
import { RiSeparator } from "react-icons/ri";

const DesignerComponent = () => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">Separator field</Label>
            <Separator />
        </div>
    );
};

const FormComponent = () => {
    return (
        <Separator />
    );
};

const PropertiesComponent = () => {
    return (
        <p>No properties for this element</p>
    );
};

const type: ElementsType = "SeparatorField";

const SeparatorFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
    }),
    designerBtnElement: {
        icon: RiSeparator,
        label: "Separator Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true,
};

export { SeparatorFieldFormElement };