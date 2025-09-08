"use client";
import { PessoaDTO } from "@/app/types/types";
import { PersonDetails } from "@/Components/PersonDetails";
import { Alert } from "@/Components/ui/Alert";
import api from "@/services/api";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Details({
  params,
}: {
  params: Promise<{ ocorrenciaId: string }>;
}) {
  const [personData, setPersonData] = useState<PessoaDTO | null>(null);
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

  const handleSearch = async (id: string) => {
    try {
      const res = await api.get(`/pessoas/${id}`);

      setPersonData(res.data);
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        setAlertStatus({
          isOpen: true,
          message: error.response?.data?.detail ?? "Erro desconhecido.",
          title: "Erro ao processar requisição",
        });
      } else {
        setAlertStatus({
          isOpen: true,
          message: "Erro desconhecido.",
          title: "Erro ao processar requisição",
        });
      }
    }
  };

  useEffect(() => {
    const f = async () => {
      const { ocorrenciaId } = await params;
      if (ocorrenciaId) handleSearch(ocorrenciaId);
    };

    f();
  }, [params]);

  return (
    <div className="min-h-screen bg-background p-4">
      <Alert
        isOpen={alertStatus.isOpen}
        message={alertStatus.message}
        title={alertStatus.title}
        handleClose={closeAlert}
      />
      {personData && <PersonDetails person={personData} />}
    </div>
  );
}
