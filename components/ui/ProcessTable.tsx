/* eslint-disable @typescript-eslint/no-unused-vars */
import { Process } from "../../lib/Process"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "./button"
import { Trash } from "lucide-react"
import { useState } from "react"

interface ProcessTableProps {
    processes: Process[]
    onDelete: (process: Process) => void
}

export default function ProcessTable({ processes, onDelete }: ProcessTableProps) {
    return (
        <>
		
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome do processo</TableHead>
                        <TableHead>Tempo de chegada</TableHead>
                        <TableHead>Tempo de execução</TableHead>
                        <TableHead>Excluir</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {processes.length > 0 ? (
                        processes.map((process) => (
                            <TableRow key={process.processId}>
                                <TableCell className="font-medium">{process.processName}</TableCell>
                                <TableCell>{process.startTime}</TableCell>
                                <TableCell>{process.executionTime}</TableCell>
                                <TableCell className="">
                                    <Button variant={"destructive"} onClick={() => onDelete(process)}>
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No processes available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
