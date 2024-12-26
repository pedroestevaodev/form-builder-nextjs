import { GetFormStats } from "@/actions/form";
import { StatsCardProps, StatsCardsProps } from "@/types/components";
import { LucideView } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";

const StatsCard = ({
    title,
    icon,
    helperText,
    value,
    loading,
    className
}: StatsCardProps) => {
    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {!loading && (
                        <Skeleton>
                            <span className="opacity-0">0</span>
                        </Skeleton>
                    )}
                    {!loading && value}
                </div>
                <p className="text-sm text-muted-foreground pt-1">{helperText}</p>
            </CardContent>
        </Card>
    )
};

const StatsCards = ({ data, loading }: StatsCardsProps) => {
    return (
        <div className="w-full pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
                title="Total Visits"
                icon={<LucideView className="text-blue-600" />}
                helperText="All time form visits"
                value={data?.visits.toLocaleString() || ""}
                loading={loading}
                className="shadow-md shadow-blue-600"
            />
            <StatsCard
                title="Total Submissions"
                icon={<FaWpforms className="text-yellow-600" />}
                helperText="All time form submissions"
                value={data?.submissions.toLocaleString() || ""}
                loading={loading}
                className="shadow-md shadow-yellow-600"
            />
            <StatsCard
                title="Submission Rate"
                icon={<HiCursorClick className="text-blue-600" />}
                helperText="Visits that resulted in form submission"
                value={`${data?.submissionRate.toLocaleString()}%` || ""}
                loading={loading}
                className="shadow-md shadow-blue-600"
            />
            <StatsCard
                title="Bounce Rate"
                icon={<TbArrowBounce className="text-red-600" />}
                helperText="Visits that leaves without interacting"
                value={`${data?.visits.toLocaleString()}%` || ""}
                loading={loading}
                className="shadow-md shadow-red-600"
            />
        </div>
    );
};

const CardStatsWrapper = async () => {
    const stats = await GetFormStats();

    return (
        <StatsCards loading={false} data={stats} />
    );
};

export { StatsCard, StatsCards, CardStatsWrapper };