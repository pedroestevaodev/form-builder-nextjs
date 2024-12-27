'use client';

import { VisitBtnProps } from "@/types/components";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { toast } from "@/hooks/useToast";
import { ImShare } from "react-icons/im";

const FormLinkShare = ({ shareUrl }: VisitBtnProps) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const shareLink = `${window.location.origin}/submit/${shareUrl}`;

    return (
        <div className="flex flex-grow items-center gap-4">
            <Input value={shareLink} readOnly />
            <Button
                className="w-[250px]"
                onClick={() => {
                    navigator.clipboard.writeText(shareLink);
                    toast({
                        title: 'Copied!',
                        description: 'Link copied to clipboard',
                    });
                }}
            >
                <ImShare className="mr-2 size-4" />
                Share Link
            </Button>
        </div>
    );
};

export { FormLinkShare };