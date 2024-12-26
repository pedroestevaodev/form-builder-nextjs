'use client';

import { ElementsType, FormElement } from "@/types/components";
import { MdTextFields } from "react-icons/md";

const type: ElementsType = "TextField";

const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: {
            label: "Text field",
            helperText: "Helper text",
            required: false,
            placeHolder: "Value here...",
        },
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field",
    },
    designerComponent: () => <div>Designer component</div>,
    formComponent: () => <div>Form component</div>,
    propertiesComponent: () => <div>Properties component</div>,
};

export { TextFieldFormElement };