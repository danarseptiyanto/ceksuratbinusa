import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpRight, Info } from "lucide-react";

export default function StatCard({
    icon: Icon,
    title,
    description,
    value,
    label,
    buttonLabel = "Lihat Detail",
    onButtonClick,
}) {
    return (
        <Card className="flex flex-col gap-4 rounded-lg bg-white p-5 shadow-sm 2xl:min-w-[168px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {Icon && <Icon size={14} />}
                    <p className="text-sm font-normal">{title}</p>
                </div>
                {description && (
                    <Tooltip>
                        <TooltipTrigger>
                            <Info size={14} className="text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{description}</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">{value}</h1>
                <p className="text-xs text-muted-foreground">{label}</p>
            </div>

            {onButtonClick && (
                <Button
                    variant=""
                    size="sm"
                    className="h-7 w-fit text-[13px] font-normal"
                    onClick={onButtonClick}
                >
                    {buttonLabel}
                    <ArrowUpRight size={14} />
                </Button>
            )}
        </Card>
    );
}
