'use client';

import { DesignerContextProps } from "@/types/contexts";
import { createContext, useContext } from "react";

export const DesignerContext = createContext<DesignerContextProps | undefined>(undefined);

export const useDesigner = () => {
    const context = useContext(DesignerContext);
    if (context === undefined) {
        throw new Error('useDesigner must be used within a DesignerProvider');
    }
    return context;
};