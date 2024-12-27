'use client';

import { VisitBtnProps } from "@/types/components";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const VisitBtn = ({ shareUrl }: VisitBtnProps) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const shareLink = `${window.location.origin}/submit/${shareUrl}`;

    return (
        <Button
            className="w-[200px]"
            onClick={() => {
                window.open(shareLink, '_blank');
            }}
        >
            Visit
        </Button>
    );
};

export { VisitBtn };