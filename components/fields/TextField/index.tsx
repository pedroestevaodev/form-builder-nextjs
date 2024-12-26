'use client';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDesigner } from "@/contexts/DesignerContext";
import { propertiesSchema } from "@/schemas/fields";
import { ComponentProps, ElementsType, FormElement, FormElementInstance } from "@/types/components";
import { PropertiesSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdTextFields } from "react-icons/md";

const extraAttributes = {
    label: "Text field",
    helperText: "Helper text",
    required: false,
    placeHolder: "Value here...",
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

const DesignerComponent = ({ elementInstance }: ComponentProps) => {
    const element = elementInstance as CustomInstance;

    const { 
        helperText, 
        label, 
        placeHolder, 
        required 
    } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Input readOnly disabled placeholder={placeHolder} />
            {helperText && (
                <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
        </div>
    );
};

const FormComponent = ({ elementInstance }: ComponentProps) => {
    const element = elementInstance as CustomInstance;
    const { helperText, label, placeHolder, required } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Input placeholder={placeHolder} />
            {helperText && (
                <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
        </div>
    );
};

const PropertiesComponent = ({ elementInstance }: ComponentProps) => {
    const element = elementInstance as CustomInstance;

    const { updateElement } = useDesigner();

    const form = useForm<PropertiesSchema>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
            placeHolder: element.extraAttributes.placeHolder,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    const applyChanges = (values: PropertiesSchema) => {
        const { label, helperText, placeHolder, required } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                required,
                placeHolder,
            },
        });
    };

    return (
        <Form {...form}>
            <form
                onBlur={form.handleSubmit(applyChanges)}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="space-y-3"
            >
                <FormField 
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field} 
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }}    
                                />
                            </FormControl>
                            <FormDescription>
                                The label of the field. <br /> 
                                It will be displayed above the field.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="placeHolder"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PlaceHolder</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field} 
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }}    
                                />
                            </FormControl>
                            <FormDescription>
                                The placeholder of the field. <br />
                                It will be displayed below the field.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="helperText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Helper Text</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field} 
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }}    
                                />
                            </FormControl>
                            <FormDescription>
                                The helper text of the field.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Required</FormLabel>
                                <FormDescription>
                                    Select if the field is required.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch 
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

const type: ElementsType = "TextField";

const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
};

export { TextFieldFormElement };