"use client";
import { FilterPerson, filterProps } from "@/Components/FilterPerson";
import { PersonCard } from "@/Components/PersonCard";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PessoaPaginadaResponse } from "./types/types";

export default function Home() {
  const router = useRouter();
  const [pensonData, setPersonData] = useState<PessoaPaginadaResponse | null>(
    null
  );

  const handleViewDetails = (ocorrenciaId: number) => {
    router.push(`/detalhes/${ocorrenciaId}`);
  };

  const handleSearch = async (data: filterProps | null) => {
    const filters = {
      nome: data?.name ?? "",
      faixaIdadeInicial: data?.minAge ?? 0,
      faixaIdadeFinal: data?.maxAge ?? 0,
      sexo: data?.gender && data.gender === "Todos" ? "" : data?.gender,
      status: data?.status && data.status === "Todos" ? "" : data?.status,
    };

    try {
      const res = await api.get("/pessoas/aberto/filtro", { params: filters });

      console.log(res.data);
      setPersonData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch(null);
  }, []);

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
          <FilterPerson handleSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {pensonData?.content.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onViewDetails={() =>
                handleViewDetails(person.ultimaOcorrencia.ocoId)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
