'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDesigner } from "@/contexts/DesignerContext";
import { subTitleFieldPropertiesSchema } from "@/schemas/fields";
import { ComponentProps, ElementsType, FormElement, FormElementInstance } from "@/types/components";
import { SubTitleFieldPropertiesSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideHeading2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const extraAttributes = {
    title: "SubTitle field",
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

const DesignerComponent = ({ elementInstance }: ComponentProps) => {
    const element = elementInstance as CustomInstance;

    const { title } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">SubTitle field</Label>
            <p className="text-lg">{title}</p>
        </div>
    );
};

const FormComponent = ({ elementInstance }: ComponentProps) => {
    const element = elementInstance as CustomInstance;

    const { title } = element.extraAttributes;

    return (
        <p className="text-lg">{title}</p>
    );
};

const PropertiesComponent = ({ elementInstance }: ComponentProps) => {
    const element = elementInstance as CustomInstance;

    const { updateElement } = useDesigner();

    const form = useForm<SubTitleFieldPropertiesSchema>({
        resolver: zodResolver(subTitleFieldPropertiesSchema),
        mode: "onBlur",
        defaultValues: {
            title: element.extraAttributes.title,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    const applyChanges = (values: SubTitleFieldPropertiesSchema) => {
        const { title } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                title,
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
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field} 
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }}
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

const type: ElementsType = "SubTitleField";

const SubTitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: LucideHeading2,
        label: "SubTitle Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true,
};

export { SubTitleFieldFormElement };