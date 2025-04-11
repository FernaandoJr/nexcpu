"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Process } from "@/lib/Process"

const chartConfig = {
    processName: {
        label: "Processo",
    },
    waitingTime: {
        label: "Tempo de espera",
    },
    executionTime: {
        label: "Tempo de Execução",
    },
} satisfies ChartConfig

interface GraphProps {
    processes: Process[]
}

export function CalculatorGraph({ processes }: GraphProps) {
    let xTicks = processes.map((process) => process.turnaroundTime)
    //i want to get the bigger tournround and make a list of ticks 1 by one
    const maxTurnaround = Math.max(...xTicks)
    xTicks = Array.from({ length: maxTurnaround + 1 }, (_, i) => i)

    processes = processes.sort((a, b) => a.order - b.order)

    // Generate random vibrant colors
    const generateRandomVibrantColor = (() => {
        const colorPalette = [
            "#F87171", // Soft Red
            "#FBBF24", // Soft Yellow
            "#34D399", // Soft Green
            "#60A5FA", // Soft Blue
            "#A78BFA", // Soft Purple
            "#F472B6", // Soft Pink
            "#FACC15", // Soft Gold
            "#4ADE80", // Soft Lime Green
            "#22D3EE", // Soft Cyan
            "#818CF8", // Soft Indigo
        ]
        let colorIndex = 0

        return () => {
            const color = colorPalette[colorIndex]
            colorIndex = (colorIndex + 1) % colorPalette.length // Cycle through the palette
            return color
        }
    })()

    processes.map((process) => {
        process.color = generateRandomVibrantColor()
        return process
    })

    return (
        <ChartContainer config={chartConfig} className="">
            <BarChart accessibilityLayer data={processes} layout="vertical">
                <CartesianGrid horizontal={false} />
                <YAxis dataKey="processName" type="category" tickLine={true} axisLine={true} tickFormatter={(value) => value.slice(0, 3)} />
                <XAxis dataKey="turnaroundTime" type="number" ticks={xTicks} interval={0} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="processName" className="flex flex-col gap-1" hideIndicator />} />
                <Bar dataKey="waitingTime" stackId="waitingTime" fill="transparent" />
                <Bar dataKey="executionTime" radius={8} stackId="waitingTime">
                    {processes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ChartContainer>
    )
}
