'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Tabs defaultValue={theme}>
            <TabsList className="border">
                <TabsTrigger value="light" onClick={() => setTheme("light")}>
                    <SunIcon className="size-[1.2rem]" />
                </TabsTrigger>
                <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
                    <MoonIcon className="size-[1.2rem] rotate-90 transition-all dark:rotate-0" />
                </TabsTrigger>
                <TabsTrigger value="system" onClick={() => setTheme("system")}>
                    <MonitorIcon className="size-[1.2rem]" />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

export { ThemeSwitcher };