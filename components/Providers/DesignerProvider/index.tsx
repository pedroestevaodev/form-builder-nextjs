'use client';

import { DesignerContext } from "@/contexts/DesignerContext";
import { FormElementInstance } from "@/types/components";
import { ChildrenProps } from "@/types/nextjs";
import { useState } from "react";

const DesignerProvider = ({ children }: Readonly<ChildrenProps>) => {
    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null);

    const addElement = (index: number, element: FormElementInstance) => {
        setElements((prevElements) => {
            const newElements = [...prevElements];
            newElements.splice(index, 0, element);
            return newElements;
        });
    };

    const removeElement = (id: string) => {
        setElements((prevElements) => {
            return prevElements.filter((element) => element.id !== id);
        });
    };

    const updateElement = (id: string, element: FormElementInstance) => {
        setElements((prevElements) => {
            const newElements = [...prevElements];
            const index = newElements.findIndex((element) => element.id === id);
            newElements[index] = element;
            return newElements;
        });
    };

    return (
        <DesignerContext.Provider 
            value={{ 
                elements, 
                addElement,
                updateElement,
                removeElement,
                selectedElement,
                setSelectedElement,
            }}
        >
            {children}
        </DesignerContext.Provider>
    );
};

export default DesignerProvider;