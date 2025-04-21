import Image from "next/image"
import FeatImage from "@/public/feat.jpeg"

function Feature() {
    return (
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="container grid grid-cols-1 items-center gap-4 rounded-lg border p-8 lg:grid-cols-2">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-regular max-w-xl text-left text-3xl tracking-tighter lg:text-5xl">NexCPU</h2>
                                <p className="max-w-xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground">Algoritmo de escalonamento SJF (Shortest Job First) para simulação de processos.</p>
                            </div>
                        </div>
                        <div className="text-md flex flex-col items-start gap-2 text-justify">
                            <p className="">O algoritmo SJF é um dos algoritmos de escalonamento de CPU mais simples e eficientes. Ele prioriza os processos com o menor tempo de execução, garantindo que os processos mais curtos sejam concluídos primeiro. Isso resulta em tempos de espera reduzidos e melhor utilização da CPU.</p>
                            <p>
                                <a href="https://github.com/FernaandoJr/NexCPU" target="_blank" rel="noopener noreferrer">
                                    <span className="border-black font-bold transition duration-100 ease-in-out hover:cursor-pointer hover:border-b-2">NexCPU</span>
                                </a>{" "}
                                é um projeto feito para a matéria de Sistemas Operacionais I lecionada por Sandro Roberto Armelin
                            </p>
                        </div>
                    </div>
                    <div className="flex aspect-square items-center justify-center overflow-hidden rounded-md bg-muted">
                        <Image alt="logo" className="aspect-square object-cover" src={FeatImage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Feature }
