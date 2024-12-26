import { Button } from "@/components/ui/button";
import { ErrorPageProps } from "@/types/nextjs";
import Link from "next/link";
import { useEffect } from "react";

const ErrorPage = ({ error }: ErrorPageProps) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center gap-4 size-full">
            <h2 className="text-destructive text-4xl">
                Something went wrong!
            </h2>
            <Button asChild>
                <Link
                    href={"/"}
                >
                    Go back to home
                </Link>
            </Button>
        </div>
    );
};

export default ErrorPage;