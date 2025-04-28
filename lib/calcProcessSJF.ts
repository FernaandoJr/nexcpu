import { Process } from "./Process"

export default function calcSJF(Processos: Process[]): Process[] {
    // Ordena os processos pelo tempo de execução (executionTime) em ordem crescente
    Processos.sort((a, b) => {
        if (a.executionTime === b.executionTime) {
            return a.startTime - b.startTime
        }
        return a.executionTime - b.executionTime
    })

    // Calcula os tempos de espera, turnaround e resposta para cada processo
    let accumulatedTime = 0
    Processos.forEach((process) => {
        process.turnaroundTime = accumulatedTime - process.startTime + process.executionTime
        process.waitingTime = accumulatedTime - process.startTime
        process.responseTime = accumulatedTime + process.executionTime - process.startTime
        accumulatedTime += process.executionTime
    })

    // Retorna o array original com os processos atualizados
    return Processos
}
