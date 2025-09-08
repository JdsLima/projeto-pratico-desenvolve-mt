"use client";
import { PessoaDTO } from "@/app/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/Card";
import { Separator } from "@/Components/ui/Separator";
import { ArrowLeft, Calendar, MapPin, User } from "lucide-react";
import { ImageWithFallback } from "@/Components/ui/ImageWithFallback";
import { Button } from "@/Components/ui/Button";
import { useRouter } from "next/navigation";
import { Badge, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { Alert } from "@/Components/ui/Alert";
import api from "@/services/api";
import axios from "axios";

interface DetailsProps {
  person: PessoaDTO;
}

export function PersonDetails({ person }: DetailsProps) {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [alertStatus, setAlertStatus] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  // Estados dos campos do formulário
  const [informacao, setInformacao] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const statusText =
    person.ultimaOcorrencia.dataLocalizacao === null
      ? "Desaparecido"
      : "Localizado";

  const closeAlert = () => {
    setAlertStatus({
      isOpen: false,
      title: "",
      message: "",
    });
  };

  const onSubmitInfo = async () => {
    if (!informacao.trim()) {
      setAlertStatus({
        isOpen: true,
        title: "Campos obrigatórios",
        message: "O campo de informação não pode estar vazio.",
      });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();

    formData.append("informacao", informacao);
    formData.append("descricao", descricao);
    formData.append("data", data);
    formData.append("ocoId", person.ultimaOcorrencia.ocoId.toString());

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    try {
      const res = await api.post(
        "/ocorrencias/informacoes-desaparecido",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201 || res.data?.status === 201) {
        setAlertStatus({
          isOpen: true,
          title: "Sucesso!",
          message: "As informações foram salvas com sucesso!",
        });

        // Resetar campos
        setInformacao("");
        setData("");
        setDescricao("");
        setFiles(null);
      }
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
    } finally {
      setIsLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Alert
        isOpen={alertStatus.isOpen}
        message={alertStatus.message}
        title={alertStatus.title}
        handleClose={closeAlert}
      />
      <Button
        variant="outline"
        onClick={route.back}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar à lista
      </Button>

      <Dialog.Root open={openDialog}>
        <Card>
          <CardHeader className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <ImageWithFallback
                  src={person.urlFoto}
                  alt={person.nome}
                  className="w-50 h-50 rounded-full object-cover"
                />
                <Badge
                  className="w-full justify-center mt-2.5"
                  color={
                    person.ultimaOcorrencia.dataLocalizacao === null
                      ? "red"
                      : "blue"
                  }
                >
                  {statusText}
                </Badge>
              </div>
              <CardTitle>{person.nome}</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Informações Básicas */}
            <div>
              <h3 className="font-semibold mb-3">Informações Básicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Idade: {person.idade} anos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>
                    Último avistamento:{" "}
                    {new Date(
                      person.ultimaOcorrencia.dataLocalizacao ??
                        person.ultimaOcorrencia.dtDesaparecimento
                    ).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Local último avistamento */}
            <div>
              <h3 className="font-semibold mb-3">
                Local do Último Avistamento
              </h3>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                <span>
                  {person.ultimaOcorrencia.localDesaparecimentoConcat}
                </span>
              </div>
            </div>

            <Separator />

            {/* Características */}
            <div>
              <h3 className="font-semibold mb-3">Características Gerais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Vestimentas:</strong>{" "}
                  {
                    person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                      ?.vestimentasDesaparecido
                  }
                </div>
                <div className="flex items-center gap-2">
                  <span>Sexo: {person.sexo}</span>
                </div>
              </div>
            </div>

            <Separator />
            <div>
              <h3 className="font-semibold mb-3">Informações</h3>
              <p className="text-muted-foreground leading-relaxed">
                {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao ??
                  "Não há informações."}
              </p>
            </div>

            <Separator />

            {/* Botão enviar informações */}
            <div className="text-center">
              <Dialog.Trigger onClick={() => setOpenDialog(true)}>
                <Button size="lg" className="w-full sm:w-auto">
                  Tenho Informações sobre esta Pessoa
                </Button>
              </Dialog.Trigger>
            </div>
          </CardContent>
        </Card>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Adicionar informações sobre esta pessoa</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Ajude os familiares a encontrar essa pessoa.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Informações de localização
              </Text>
              <TextField.Root
                placeholder="Digite as informações de localização"
                value={informacao}
                onChange={(e) => setInformacao(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Data
              </Text>
              <TextField.Root
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Descrição do anexo
              </Text>
              <TextField.Root
                placeholder="Adicione a descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Arquivos
              </Text>
              <input
                id="files"
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button onClick={() => setOpenDialog(false)} color="gray">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button
              onClick={onSubmitInfo}
              className="bg-green-500"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
