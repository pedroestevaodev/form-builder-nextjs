import { GetFormStats } from "@/actions/form";
import { Form } from "@prisma/client";

export interface StatsCardProps {
    title: string;
    icon: React.ReactNode;
    helperText: string;
    value: string;
    loading: boolean;
    className?: string;
};

export interface StatsCardsProps {
    data?: Awaited<ReturnType<typeof GetFormStats>>;
    loading: boolean;
};

export interface FormCardProps {
    form: Form;
};

export interface FormBuilderProps {
    form: Form;
};

export type ElementsType = "TextField";

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, string | number | boolean>;
};

export type FormElement = {
    type: ElementsType;
    construct: (id: string) => FormElementInstance;
    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    };
    designerComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
};

export interface ComponentProps {
    elementInstance: FormElementInstance;
};

export type FormElementsType = {
    [key in ElementsType]: FormElement;
};

export interface SidebarBtnElementProps {
    formElement: FormElement;
};

export interface DesignerElementWrapperProps {
    element: FormElementInstance;
};