'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDesigner } from "@/contexts/DesignerContext";
import { cn } from "@/lib/utils";
import { checkboxFieldPropertiesSchema } from "@/schemas/fields";
import { ComponentProps, ElementsType, FormElement, FormElementInstance } from "@/types/components";
import { CheckboxFieldPropertiesSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdCheckbox } from "react-icons/io";

const extraAttributes = {
    label: "Checkbox field",
    helperText: "Helper text",
    required: false,
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

const DesignerComponent = ({ elementInstance }: ComponentProps) => {
    const element = elementInstance as CustomInstance;

    const { 
        helperText, 
        label,
        required 
    } = element.extraAttributes;

    const id = `checkbox-${element.id}`;

    return (
        <div className="flex items-start space-x-2">
            <Checkbox id={id} />
            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={id}>
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </Label>
                {helperText && (
                    <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
                )}
            </div>
        </div>
    );
};

const FormComponent = ({ elementInstance, submitValue, isInvalid, defaultValue }: ComponentProps) => {
    const element = elementInstance as CustomInstance;

    const [value, setValue] = useState<boolean>(defaultValue === "true" ? true : false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const { helperText, label, required } = element.extraAttributes;

    const id = `checkbox-${element.id}`;

    return (
        <div className="flex items-start space-x-2">
            <Checkbox 
                id={id}
                checked={value}
                className={cn(error && "border-red-500")}
                onCheckedChange={(checked) => {
                    let value = false;
                    if (checked === true) value = true;

                    setValue(value);
                    if (!submitValue) return;
                    const stringValue = value ? "true" : "false";
                    const valid = CheckboxFieldFormElement.validate(element, stringValue);
                    setError(!valid);
                    submitValue(element.id, stringValue);
                }}
            />
            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={id} className={cn(error && "text-red-500")}>
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </Label>
                {helperText && (
                    <p 
                        className={cn(
                            "text-[0.8rem] text-muted-foreground",
                            error && "text-red-500"
                        )}
                    >
                        {helperText}
                    </p>
                )}
            </div>
        </div>
    );
};

const PropertiesComponent = ({ elementInstance }: ComponentProps) => {
    const element = elementInstance as CustomInstance;

    const { updateElement } = useDesigner();

    const form = useForm<CheckboxFieldPropertiesSchema>({
        resolver: zodResolver(checkboxFieldPropertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    const applyChanges = (values: CheckboxFieldPropertiesSchema) => {
        const { label, helperText, required } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                required,
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

const type: ElementsType = "CheckboxField";

const CheckboxFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: IoMdCheckbox,
        label: "CheckBox Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element = formElement as CustomInstance;
        if (element.extraAttributes.required) {
            return currentValue === "true";
        }

        return true;
    },
};

export { CheckboxFieldFormElement };