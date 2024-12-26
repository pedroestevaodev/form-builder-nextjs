import { FormElementInstance } from "./components";

export interface DesignerContextProps {
    elements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance) => void;
};