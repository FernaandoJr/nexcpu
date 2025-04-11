import {Process} from "./Process";


export default function calcSJF(Processos: Process[]): Process[] {
	Processos.sort((a, b) => a.executionTime - b.executionTime);

	const totalProcesses = Processos.length;

	return Processos.map((process, index) => {
		process.waitingTime = index === 0 ? 0 : Processos[index - 1].executionTime + Processos[index - 1].waitingTime;
		process.turnaroundTime = process.waitingTime + process.executionTime;
		process.responseTime = process.waitingTime;

		if(index === Processos.length -1){
			console.log("Average Waiting Time: ", Processos.reduce((accumulator, process) => accumulator + process.waitingTime, 0) / totalProcesses);
			console.log("Average Turnaround Time: ", Processos.reduce((accumulator, process) => accumulator + process.turnaroundTime, 0) / totalProcesses);
			console.log("Average Response Time: ", Processos.reduce((accumulator, process) => accumulator + process.responseTime, 0) / totalProcesses)
			console.log("Order", process.order)
			console.log(Processos)
		}
		return process;
	})
}