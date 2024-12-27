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

export type ElementsType = 
    | "TextField" 
    | "TitleField" 
    | "SubTitleField" 
    | "ParagraphField" 
    | "SeparatorField" 
    | "SpacerField"
    | "NumberField"
    | "TextAreaField"
    | "DateField"
    | "SelectField"
    | "CheckboxField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, string | number | boolean | string[]>;
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
        submitValue?: (key: string, value: string) => void;
        isInvalid?: boolean;
        defaultValue?: string;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export interface ComponentProps {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
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

export interface BtnFormProps {
    id: number;
};

export interface VisitBtnProps {
    shareUrl: string;
};

export interface FormSubmitComponentProps {
    formUrl: string;
    content: FormElementInstance[];
};

export type RowType = {
    [key: string]: string;
} & {
    submittedAt: Date;
};

export interface RowCellProps {
    type: ElementsType;
    value: string;
};