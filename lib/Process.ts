export interface Process {
	processId: string;
	processName: string;
	startTime: number;
	executionTime: number;
	waitingTime: number;
	turnaroundTime: number;
	responseTime: number;
	order: number;
	color?: string;
	remainingTime?: number; // Added property
}