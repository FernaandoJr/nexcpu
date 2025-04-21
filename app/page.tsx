/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from "uuid"
import ProcessTable from "@/components/ui/ProcessTable"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Process } from "@/lib/Process"
import { Separator } from "@/components/ui/separator"
import Banner from "@/components/own/Banner"
import calcSJF from "@/lib/calcProcessSJF"
import { CalculatorGraph } from "@/components/own/CalculatorGraph"
import { Card } from "@/components/ui/card"
import Sections from "@/components/own/Sections"

export default function Home() {
    const mockedProcesses: Process[] = [
        {
            processId: uuidv4(),
            processName: "P1",
            startTime: 0,
            executionTime: 8,
            waitingTime: 0,
            turnaroundTime: 0,
            responseTime: 0,
            order: 0,
        },
        {
            processId: uuidv4(),
            processName: "P2",
            startTime: 0,
            executionTime: 4,
            waitingTime: 0,
            turnaroundTime: 0,
            responseTime: 0,
            order: 1,
        },
        {
            processId: uuidv4(),
            processName: "P3",
            startTime: 0,
            executionTime: 2,
            waitingTime: 0,
            turnaroundTime: 0,
            responseTime: 0,
            order: 2,
        },
        {
            processId: uuidv4(),
            processName: "P4",
            startTime: 0,
            executionTime: 3,
            waitingTime: 0,
            turnaroundTime: 0,
            responseTime: 0,
            order: 3,
        },
        {
            processId: uuidv4(),
            processName: "P5",
            startTime: 0,
            executionTime: 5,
            waitingTime: 0,
            turnaroundTime: 0,
            responseTime: 0,
            order: 4,
        },
        {
            processId: uuidv4(),
            processName: "P6",
            startTime: 8,
            executionTime: 10,
            waitingTime: 0,
            turnaroundTime: 0,
            responseTime: 0,
            order: 5,
        },
    ]
    const [processes, setProcesses] = useState<Process[]>(mockedProcesses)
    const [processName, setProcessName] = useState("P6")
    const [startTime, setStartTime] = useState(0)
    const [executionTime, setExecutionTime] = useState(4)
    const [order, setOrder] = useState(processes.length + 1)

    const handleCreateProcess = (event: React.FormEvent) => {
        event.preventDefault()

        const newProcess: Process = {
            processId: uuidv4(),
            processName,
            startTime,
            executionTime,
            waitingTime: 0,
            turnaroundTime: 0,
            responseTime: 0,
            order,
        }
        setProcessName("")
        setStartTime(0)
        setExecutionTime(1)
        setOrder(order + 1)

        setProcesses([...processes, newProcess])
    }

    const handleProcessDelete = (currentProcess: Process) => {
        const updatedProcesses = processes.filter((process) => process.processId !== currentProcess.processId)
        setProcesses(updatedProcesses)
    }

    const calculatedProcesses = calcSJF(processes)

    return (
        <div className="flex flex-col">
            <Banner />
            <Sections />
            <div className="flex justify-center">
                <div className="container mt-4 flex flex-col items-center justify-center gap-4 px-4 md:flex-row">
                    <div className="flex h-fit self-start rounded-xl border border-border p-4">
                        <form onSubmit={handleCreateProcess}>
                            <div className="w-full">
                                <div className="flex flex-col gap-3">
                                    <Label>Nome do processo</Label>
                                    <Input value={processName} placeholder="P10" required defaultChecked={false} type={"text"} onChange={(event) => setProcessName(event.target.value)} />
                                    <Label>Tempo de chegada</Label>
                                    <Input value={startTime} min={0} placeholder="Tempo de Chegada" required max={50} type={"number"} onChange={(event) => setStartTime(Number(event.target.value))} />
                                    <Label>Tempo de execução</Label>
                                    <Input value={executionTime} required min={1} placeholder="0" max={100} type={"number"} onChange={(event) => setExecutionTime(Number(event.target.value))} />
                                    <Button className="bg-green-600 hover:bg-green-700" type="submit">
                                        Cadastrar processo
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="self-start rounded-xl border border-border p-4">
                        <ProcessTable processes={processes} onDelete={handleProcessDelete} />
                    </div>
                </div>
            </div>
            {processes.length === 0 ? (
                <div className="flex h-[30vh] flex-col items-center justify-center p-4">
                    <h1 className="text-3xl font-bold">Nenhum processo cadastrado. </h1>
                </div>
            ) : (
                <>
                    <div className="m-4 flex-col items-center justify-center rounded-xl border border-border p-4">
                        <h1 className="text-center text-2xl font-bold">Gráfico de Gantt</h1>
                        <CalculatorGraph processes={calculatedProcesses} />
                    </div>
                    <Card className="m-4 flex-col items-center justify-center rounded-xl border border-border p-4 text-xl">
                        <h1 className="text-center text-2xl font-bold">Tempo médio dos processos</h1>
                        <Separator className="my-4" />
                        <div className="flex flex-col gap-2">
                            <p>Tempo Médio de Retorno (TMR): {(calculatedProcesses.reduce((acc, process) => acc + process.turnaroundTime, 0) / calculatedProcesses.length).toFixed(2)}</p>
                            <p>Tempo Médio de Espera (TME): {(calculatedProcesses.reduce((acc, process) => acc + process.waitingTime, 0) / calculatedProcesses.length).toFixed(2)}</p>
                            <p>Tempo de processamento total: {calculatedProcesses.reduce((acc, process) => acc + process.executionTime, 0)}</p>
                        </div>
                    </Card>
                    <div className="flex flex-wrap justify-center gap-4">
                        {calculatedProcesses.map((index) => {
                            return (
                                <Card key={index.processId} className="m-4 flex-col items-center justify-center rounded-xl border border-border p-4">
                                    <h1 className="text-center text-2xl font-bold">{index.processName}</h1>
                                    <Separator className="my-4" />
                                    <div className="flex flex-col gap-2">
                                        <p>Turnaround: {index.turnaroundTime}</p>
                                        <p>Tempo de espera: {index.waitingTime}</p>
                                        <p>Tempo de Processamento: {index.executionTime}</p>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}
