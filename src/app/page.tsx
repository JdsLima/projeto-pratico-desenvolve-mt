"use client";
import { FilterPerson, filterProps } from "@/Components/FilterPerson";
import { PersonCard } from "@/Components/PersonCard";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { PessoaPaginadaResponse } from "./types/types";
import { PeopleResume } from "@/Components/PeopleResume";
import ReactPaginate from "react-paginate";
import { Skeleton } from "@radix-ui/themes";
import api from "@/services/api";
import { Alert } from "@/Components/ui/Alert";
import axios from "axios";
import { MainContext } from "@/contexts/mainContext";

export default function Home() {
  const router = useRouter();
  const { currentPage, handleChangePage } = useContext(MainContext);
  const [personData, setPersonData] = useState<PessoaPaginadaResponse | null>(
    null
  );
  const [isLoading, setIsloading] = useState(false);
  const [missing, setMissing] = useState(0);
  const [found, setFound] = useState(0);
  const [filters, setFilters] = useState({
    nome: "",
    faixaIdadeInicial: 0,
    faixaIdadeFinal: 0,
    sexo: "",
    status: "",
    pagina: currentPage - 1,
  });
  const [alertStatus, setAlertStatus] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const closeAlert = () => {
    setAlertStatus({
      isOpen: false,
      title: "",
      message: "",
    });
  };

  const handleViewDetails = (ocorrenciaId: number) => {
    router.push(`/detalhes/${ocorrenciaId}`);
  };

  const handleChangeFilters = useCallback(
    (data: filterProps | null) => {
      setFilters({
        nome: data?.nome ?? "",
        faixaIdadeInicial: data?.faixaIdadeInicial ?? 0,
        faixaIdadeFinal: data?.faixaIdadeFinal ?? 0,
        sexo:
          data?.sexo && data.sexo === "Todos"
            ? ""
            : data?.sexo
            ? data.sexo
            : "",
        status:
          data?.status && data.status === "Todos"
            ? ""
            : data?.status
            ? data.status
            : "",
        pagina: data?.pagina ?? 0,
      });

      if (!data?.pagina) {
        handleChangePage(1);
      }
    },
    [handleChangePage]
  );

  const handlePageClick = useCallback(
    (selectedItem: { selected: number }) => {
      const pageID = selectedItem.selected;
      handleChangePage(pageID + 1);
      handleChangeFilters({ ...filters, pagina: pageID });
    },
    [filters, handleChangeFilters, handleChangePage]
  );

  const handleGetResume = async () => {
    setIsloading(true);
    try {
      const res = await api.get("/pessoas/aberto/estatistico");

      setFound(res.data.quantPessoasEncontradas);
      setMissing(res.data.quantPessoasDesaparecidas);
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        setAlertStatus({
          isOpen: true,
          message: error.response?.data?.detail ?? "Erro desconhecido.",
          title: "Erro ao buscar dados do resumo",
        });
      } else {
        setAlertStatus({
          isOpen: true,
          message: "Erro desconhecido.",
          title: "Erro ao buscar dados do resumo",
        });
      }
    } finally {
      setIsloading(false);
    }
  };

  const handleSearch = useCallback(async (_filters: typeof filters) => {
    setIsloading(true);
    try {
      const res = await api.get("/pessoas/aberto/filtro", {
        params: _filters,
      });

      setPersonData(res.data);
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        setAlertStatus({
          isOpen: true,
          message: error.response?.data?.detail ?? "Erro desconhecido.",
          title: "Erro ao buscar dados",
        });
      } else {
        setAlertStatus({
          isOpen: true,
          message: "Erro desconhecido.",
          title: "Erro ao realizar a busca dos dados",
        });
      }
    } finally {
      setIsloading(false);
    }
  }, []);

  useEffect(() => {
    handleGetResume();
  }, []);

  useEffect(() => {
    handleSearch(filters);
  }, [filters, handleSearch]);

  return (
    <div className="min-h-screen bg-background">
      <Alert
        isOpen={alertStatus.isOpen}
        message={alertStatus.message}
        title={alertStatus.title}
        handleClose={closeAlert}
      />
      <div className="container mx-auto p-4 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Pessoas Desaparecidas</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ajude a encontrar pessoas desaparecidas ou registre informações
            sobre pessoas localizadas. Cada informação pode fazer a diferença.
          </p>
          <PeopleResume
            isLoading={isLoading}
            desaparecidas={missing}
            encontradas={found}
          />
          <FilterPerson handleSearch={handleChangeFilters} />
        </div>
        <div className="flex justify-end items-center">
          <p className="text-muted-foreground">
            Página {currentPage} de {personData?.totalPages}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {isLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton
                  key={i}
                  width="20vw"
                  minWidth={"280px"}
                  height="450px"
                />
              ))
            : personData?.content.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onViewDetails={() => handleViewDetails(person.id)}
                />
              ))}
        </div>
        {personData?.totalPages && personData?.totalPages > 0 && (
          <ReactPaginate
            previousLabel={"← Anterior"}
            nextLabel={"Próximo →"}
            breakLabel={"..."}
            pageCount={personData?.totalPages}
            forcePage={currentPage - 1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            pageClassName={"page-item"}
            breakClassName={"page-item"}
            disabledClassName={"disabled"}
          />
        )}
      </div>
    </div>
  );
}
