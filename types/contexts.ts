import { Dispatch, SetStateAction } from "react";
import { FormElementInstance } from "./components";

export interface DesignerContextProps {
    elements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance) => void;
    updateElement: (id: string, element: FormElementInstance) => void;
    removeElement: (id: string) => void;
    selectedElement: FormElementInstance | null;
    setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
    setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
};