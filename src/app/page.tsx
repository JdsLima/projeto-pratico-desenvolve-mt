"use client";
import { PersonCard } from "@/Components/PersonCard";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleViewDetails = (ocorrenciaId: string) => {
    router.push(`/detalhes/${ocorrenciaId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Pessoas Desaparecidas</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ajude a encontrar pessoas desaparecidas ou registre informações
            sobre pessoas localizadas. Cada informação pode fazer a diferença.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          <PersonCard
            person={{
              id: "2",
              name: "João Pedro Oliveira",
              age: 28,
              photo:
                "https://images.unsplash.com/photo-1611695434398-4f4b330623e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzEwMjQzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              status: "found",
              lastSeen: {
                date: "2025-01-02",
                location: "Vila Madalena, São Paulo",
              },
              description:
                "Rapaz alto, moreno, tatuagem no braço direito. Foi encontrado em hospital após acidente.",
              characteristics: {
                height: "1,82m",
                weight: "75kg",
                eyeColor: "Castanhos escuros",
                hairColor: "Preto",
              },
              contactInfo: {
                phone: "(11) 98888-5678",
                email: "mae.joao@email.com",
              },
              createdAt: "2025-01-02T14:20:00Z",
            }}
            onViewDetails={() => handleViewDetails("123")}
          />
        </div>
      </div>
    </div>
  );
}
