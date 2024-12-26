import Link from "next/link";
import { GetForms } from "@/actions/form";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { FormCardProps } from "@/types/components";
import { Badge } from "../ui/badge";
import { formatDistance } from "date-fns";
import { LucideView } from "lucide-react";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { Button } from "../ui/button";
import { BiRightArrowAlt } from "react-icons/bi";

const FormCard = ({ form }: FormCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                    <span className="truncate font-bold">
                        {form.name}
                    </span>
                    {form.published && <Badge>Published</Badge>}
                    {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
                </CardTitle>
                <CardDescription className="flex items-start justify-between text-muted-foreground text-sm">
                    {formatDistance(form.createdAt, new Date(), {
                        addSuffix: true,
                    })}
                    {!form.published && (
                        <span className="flex items-center gap-2">
                            <LucideView className="text-muted-foreground" />
                            <span>{form.visits.toLocaleString()}</span>
                            <FaWpforms className="text-muted-foreground" />
                            <span>{form.submissions.toLocaleString()}</span>
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
                {form.description || "No description"}
            </CardContent>
            <CardFooter>
                {form.published && (
                    <Button 
                        className="w-full mt-2 text-md gap-4"
                        asChild
                    >
                        <Link
                            href={`/forms/${form.id}`}
                        >
                            View submissions
                            <BiRightArrowAlt />
                        </Link>
                    </Button>
                )}
                {!form.published && (
                    <Button 
                        className="w-full mt-2 text-md gap-4"
                        variant={"secondary"}
                        asChild
                    >
                        <Link
                            href={`/builder/${form.id}`}
                        >
                            Edit form
                            <FaEdit />
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

const FormCards = async () => {
    const forms = await GetForms();

    console.log(forms);

    return (
        <>
            {forms.map((form) => (
                <FormCard key={form.id} form={form} />
            ))}
        </>
    );
};

const FormCardSkeleton = () => {
    return (
        <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />
    );
};

export { FormCard, FormCards, FormCardSkeleton };