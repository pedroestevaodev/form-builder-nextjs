'use client';

import { DesignerContext } from "@/contexts/DesignerContext";
import { FormElementInstance } from "@/types/components";
import { ChildrenProps } from "@/types/nextjs";
import { useState } from "react";

const DesignerProvider = ({ children }: Readonly<ChildrenProps>) => {
    const [elements, setElements] = useState<FormElementInstance[]>([]);

    const addElement = (index: number, element: FormElementInstance) => {
        setElements((prevElements) => {
            const newElements = [...prevElements];
            newElements.splice(index, 0, element);
            return newElements;
        });
    };

    return (
        <DesignerContext.Provider 
            value={{ 
                elements, 
                addElement 
            }}
        >
            {children}
        </DesignerContext.Provider>
    );
};

export default DesignerProvider;