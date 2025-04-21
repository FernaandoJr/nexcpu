"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
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
    const maxTurnaround = processes.reduce((acc, process) => acc + process.executionTime, 0)
    xTicks = Array.from({ length: maxTurnaround + 1 }, (_, i) => i)

    // Create a new array to avoid mutating the original processes
    const updatedProcesses = processes.map((process) => ({
        ...process,
        waitingTime: process.waitingTime + process.startTime,
    }))

    console.log("updatedProcesses", updatedProcesses)

    updatedProcesses.sort((a, b) => a.order - b.order)

    // Generate random vibrant colors
    const generateRandomVibrantColor = (() => {
        const colorPalette = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA", "#F472B6", "#FACC15", "#4ADE80", "#22D3EE", "#818CF8"]
        let colorIndex = 0

        return () => {
            const color = colorPalette[colorIndex]
            colorIndex = (colorIndex + 1) % colorPalette.length
            return color
        }
    })()

    const processesWithColors = updatedProcesses.map((process) => ({
        ...process,
        color: generateRandomVibrantColor(),
    }))

    return (
        <ChartContainer config={chartConfig} className="w-full">
            <BarChart accessibilityLayer data={processesWithColors} layout="vertical" title="Gráfico de Processos" width={500} height={300} desc="Gráfico de processos">
                <CartesianGrid horizontal={true} />
                <YAxis dataKey="processName" type="category" tickLine={true} tickFormatter={(value) => value.slice(0, 3)} />
                <XAxis dataKey="turnaroundTime" type="number" ticks={xTicks} interval={0} scale={"time"} />
                <Bar dataKey="waitingTime" stackId="waitingTime" fill="transparent" />
                <Bar dataKey="executionTime" radius={8} stackId="waitingTime">
                    {processesWithColors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ChartContainer>
    )
}
