"use client";

import React, { useState, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export function ChartBarInteractive() {
    // ✅ Get data from Laravel via Inertia props
    const { chart_data } = usePage().props;

    // ✅ Chart configuration (color variables from your CSS)
    const chartConfig = {
        surat: {
            label: "Surat",
            color: "var(--chart-1)",
        },
        surat_masuk: {
            label: "Surat Masuk",
            color: "var(--chart-2)",
        },
    };

    const [activeChart, setActiveChart] = useState("surat");

    // ✅ Calculate totals dynamically
    const total = useMemo(
        () => ({
            surat: chart_data?.reduce((acc, curr) => acc + curr.surat, 0) || 0,
            surat_masuk:
                chart_data?.reduce((acc, curr) => acc + curr.surat_masuk, 0) ||
                0,
        }),
        [chart_data],
    );

    return (
        <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 pt-4 sm:!py-0">
                    <CardTitle>Statistik Surat</CardTitle>
                    <CardDescription>
                        Menampilkan jumlah surat per hari selama 20 hari
                        terakhir
                    </CardDescription>
                </div>
                <div className="flex">
                    {["surat", "surat_masuk"].map((key) => {
                        const chart = key;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[key].toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chart_data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey={chartConfig[activeChart].label}
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value,
                                        ).toLocaleDateString("id-ID", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        });
                                    }}
                                />
                            }
                        />
                        <Bar
                            dataKey={activeChart}
                            fill={chartConfig[activeChart].color}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
